import {dedupExchange, fetchExchange, stringifyVariables} from '@urql/core';
import {cacheExchange, QueryInput, Cache, Resolver} from '@urql/exchange-graphcache';
import {LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation} from "../generated/graphql";
import {betterUpdateQuery} from "./betterUpdateQuery";
import { pipe, tap } from 'wonka';
import { Exchange } from 'urql';
import Router from 'next/router'


const errorExchange: Exchange = ({ forward }) => ops$ => {
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            console.log(error);
            if (error?.message.includes("not authenticated")){
                Router.replace("/login");
            }
        })
    );
};

const cursorPagination = (): Resolver => {
    return (_parent, fieldArgs, cache, info) => {
        console.log('1234567');
        const { parentKey: entityKey, fieldName } = info;
        const allFields = cache.inspectFields(entityKey);
        const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
        const size = fieldInfos.length;

        if (size === 0) {
            return undefined;
        }

        console.log("----------------");
        console.log(fieldInfos);
        const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
        const isItInTheCache = cache.resolveFieldByKey(entityKey, fieldKey);

        info.partial = !isItInTheCache;

        const results: string[] = [];
        fieldInfos.forEach((fi) => {
           const data = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string[];
           results.push(...data)
        });

        console.log(results)

        return results;
    };
};

export const CreateUrqlClient = (ssrExchange: any) => ({

    url: 'http://localhost:4321/graphql',
    fetchOptions: {
        credentials: "include" as const
    },
    exchanges: [dedupExchange, cacheExchange({
        resolvers: {
          Query: {
              posts: cursorPagination()
          }
        },
        updates: {
            Mutation: {
                logout: (_result, args, cache, info) => {
                    betterUpdateQuery<LogoutMutation, MeQuery>(cache, {
                            query: MeDocument
                        },
                        _result,
                        () => ({me: null})
                    )
                },
                login: (_result, args, cache, info) => {
                    betterUpdateQuery<LoginMutation, MeQuery>(cache, {
                            query: MeDocument
                        },
                        _result,
                        (result, query) => {
                            if (result.login.errors) {
                                return query
                            }
                            return {
                                me: result.login.user,
                            }
                        }
                    )

                },
                register: (_result, args, cache, info) => {
                    betterUpdateQuery<RegisterMutation, MeQuery>(cache, {
                            query: MeDocument
                        },
                        _result,
                        (result, query) => {
                            if (result.register.errors) {
                                return query
                            }
                            return {
                                me: result.register.user,
                            }
                        }
                    )

                }
            }
        }
    }),
        errorExchange,
        ssrExchange,
        fetchExchange]
})
