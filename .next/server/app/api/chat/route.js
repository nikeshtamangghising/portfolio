/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! openai */ \"(rsc)/./node_modules/openai/index.mjs\");\n\n\n// Initialize OpenAI client for OpenRouter\nconst openai = new openai__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    baseURL: 'https://openrouter.ai/api/v1',\n    apiKey: process.env.OPENROUTER_API_KEY || \"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\",\n    defaultHeaders: {\n        'HTTP-Referer': \"http://localhost:3000\" || 0,\n        'X-Title': \"Portfolio Chat\" || 0,\n        'Content-Type': 'application/json'\n    }\n});\n// Get model from environment variable or use default\nconst CHAT_MODEL = \"tngtech/deepseek-r1t2-chimera:free\" || 0;\nasync function POST(req) {\n    try {\n        const { message } = await req.json();\n        if (!message) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Message is required'\n            }, {\n                status: 400\n            });\n        }\n        const completion = await openai.chat.completions.create({\n            model: CHAT_MODEL,\n            messages: [\n                {\n                    role: 'system',\n                    content: 'You are a helpful assistant embedded in a portfolio website. Keep responses concise and professional.'\n                },\n                {\n                    role: 'user',\n                    content: message\n                }\n            ],\n            temperature: 0.7\n        });\n        // Debug logging if enabled\n        if (true) {\n            console.log('OpenRouter Request:', {\n                model: CHAT_MODEL,\n                message: message.substring(0, 100) + (message.length > 100 ? '...' : '')\n            });\n            console.log('OpenRouter Response:', {\n                id: completion.id,\n                model: completion.model,\n                usage: completion.usage\n            });\n        }\n        const response = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            response\n        });\n    } catch (error) {\n        console.error('OpenRouter API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Error processing your request'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBQ2Y7QUFFNUIsMENBQTBDO0FBQzFDLE1BQU1FLFNBQVMsSUFBSUQsOENBQU1BLENBQUM7SUFDeEJFLFNBQVM7SUFDVEMsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxrQkFBa0IsSUFBSUYsMkVBQTBDO0lBQ3BGSSxnQkFBZ0I7UUFDZCxnQkFBZ0JKLHVCQUFnQyxJQUFJLENBQXVCO1FBQzNFLFdBQVdBLGdCQUFpQyxJQUFJLENBQWdCO1FBQ2hFLGdCQUFnQjtJQUNsQjtBQUNGO0FBRUEscURBQXFEO0FBQ3JELE1BQU1PLGFBQWFQLG9DQUF3QyxJQUFJLENBQW9DO0FBRTVGLGVBQWVTLEtBQUtDLEdBQVk7SUFDckMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsT0FBTyxFQUFFLEdBQUcsTUFBTUQsSUFBSUUsSUFBSTtRQUVsQyxJQUFJLENBQUNELFNBQVM7WUFDWixPQUFPaEIscURBQVlBLENBQUNpQixJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQXNCLEdBQy9CO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxNQUFNQyxhQUFhLE1BQU1sQixPQUFPbUIsSUFBSSxDQUFDQyxXQUFXLENBQUNDLE1BQU0sQ0FBQztZQUN0REMsT0FBT1o7WUFDUGEsVUFBVTtnQkFDUjtvQkFDRUMsTUFBTTtvQkFDTkMsU0FBUztnQkFDWDtnQkFDQTtvQkFBRUQsTUFBTTtvQkFBUUMsU0FBU1g7Z0JBQVE7YUFDbEM7WUFDRFksYUFBYTtRQUNmO1FBRUEsMkJBQTJCO1FBQzNCLElBQUl2QixJQUE2QyxFQUFFO1lBQ2pEeUIsUUFBUUMsR0FBRyxDQUFDLHVCQUF1QjtnQkFDakNQLE9BQU9aO2dCQUNQSSxTQUFTQSxRQUFRZ0IsU0FBUyxDQUFDLEdBQUcsT0FBUWhCLENBQUFBLFFBQVFpQixNQUFNLEdBQUcsTUFBTSxRQUFRLEVBQUM7WUFDeEU7WUFDQUgsUUFBUUMsR0FBRyxDQUFDLHdCQUF3QjtnQkFDbENHLElBQUlkLFdBQVdjLEVBQUU7Z0JBQ2pCVixPQUFPSixXQUFXSSxLQUFLO2dCQUN2QlcsT0FBT2YsV0FBV2UsS0FBSztZQUN6QjtRQUNGO1FBRUEsTUFBTUMsV0FBV2hCLFdBQVdpQixPQUFPLENBQUMsRUFBRSxFQUFFckIsU0FBU1csV0FBVztRQUU1RCxPQUFPM0IscURBQVlBLENBQUNpQixJQUFJLENBQUM7WUFBRW1CO1FBQVM7SUFDdEMsRUFBRSxPQUFPbEIsT0FBTztRQUNkWSxRQUFRWixLQUFLLENBQUMseUJBQXlCQTtRQUN2QyxPQUFPbEIscURBQVlBLENBQUNpQixJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBZ0MsR0FDekM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcbmlrZXNcXE9uZURyaXZlXFxEZXNrdG9wXFxQcm9qZWN0XFxwb3J0Zm9saW9cXGFwcFxcYXBpXFxjaGF0XFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgT3BlbkFJIGZyb20gJ29wZW5haSc7XG5cbi8vIEluaXRpYWxpemUgT3BlbkFJIGNsaWVudCBmb3IgT3BlblJvdXRlclxuY29uc3Qgb3BlbmFpID0gbmV3IE9wZW5BSSh7XG4gIGJhc2VVUkw6ICdodHRwczovL29wZW5yb3V0ZXIuYWkvYXBpL3YxJyxcbiAgYXBpS2V5OiBwcm9jZXNzLmVudi5PUEVOUk9VVEVSX0FQSV9LRVkgfHwgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfT1BFTlJPVVRFUl9BUElfS0VZLFxuICBkZWZhdWx0SGVhZGVyczoge1xuICAgICdIVFRQLVJlZmVyZXInOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TSVRFX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAnWC1UaXRsZSc6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NJVEVfTkFNRSB8fCAnUG9ydGZvbGlvIENoYXQnLFxuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgfSxcbn0pO1xuXG4vLyBHZXQgbW9kZWwgZnJvbSBlbnZpcm9ubWVudCB2YXJpYWJsZSBvciB1c2UgZGVmYXVsdFxuY29uc3QgQ0hBVF9NT0RFTCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX09QRU5ST1VURVJfTU9ERUwgfHwgJ3RuZ3RlY2gvZGVlcHNlZWstcjF0Mi1jaGltZXJhOmZyZWUnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ01lc3NhZ2UgaXMgcmVxdWlyZWQnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wbGV0aW9uID0gYXdhaXQgb3BlbmFpLmNoYXQuY29tcGxldGlvbnMuY3JlYXRlKHtcbiAgICAgIG1vZGVsOiBDSEFUX01PREVMLFxuICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHJvbGU6ICdzeXN0ZW0nLFxuICAgICAgICAgIGNvbnRlbnQ6ICdZb3UgYXJlIGEgaGVscGZ1bCBhc3Npc3RhbnQgZW1iZWRkZWQgaW4gYSBwb3J0Zm9saW8gd2Vic2l0ZS4gS2VlcCByZXNwb25zZXMgY29uY2lzZSBhbmQgcHJvZmVzc2lvbmFsLicsXG4gICAgICAgIH0sXG4gICAgICAgIHsgcm9sZTogJ3VzZXInLCBjb250ZW50OiBtZXNzYWdlIH0sXG4gICAgICBdLFxuICAgICAgdGVtcGVyYXR1cmU6IDAuNyxcbiAgICB9KTtcbiAgICBcbiAgICAvLyBEZWJ1ZyBsb2dnaW5nIGlmIGVuYWJsZWRcbiAgICBpZiAocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfREVCVUdfTU9ERSA9PT0gJ3RydWUnKSB7XG4gICAgICBjb25zb2xlLmxvZygnT3BlblJvdXRlciBSZXF1ZXN0OicsIHtcbiAgICAgICAgbW9kZWw6IENIQVRfTU9ERUwsXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIDEwMCkgKyAobWVzc2FnZS5sZW5ndGggPiAxMDAgPyAnLi4uJyA6ICcnKVxuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZygnT3BlblJvdXRlciBSZXNwb25zZTonLCB7XG4gICAgICAgIGlkOiBjb21wbGV0aW9uLmlkLFxuICAgICAgICBtb2RlbDogY29tcGxldGlvbi5tb2RlbCxcbiAgICAgICAgdXNhZ2U6IGNvbXBsZXRpb24udXNhZ2VcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gY29tcGxldGlvbi5jaG9pY2VzWzBdPy5tZXNzYWdlPy5jb250ZW50IHx8ICdTb3JyeSwgSSBjb3VsZCBub3QgcHJvY2VzcyB5b3VyIHJlcXVlc3QuJztcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHJlc3BvbnNlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ09wZW5Sb3V0ZXIgQVBJIGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRXJyb3IgcHJvY2Vzc2luZyB5b3VyIHJlcXVlc3QnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiT3BlbkFJIiwib3BlbmFpIiwiYmFzZVVSTCIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJPUEVOUk9VVEVSX0FQSV9LRVkiLCJORVhUX1BVQkxJQ19PUEVOUk9VVEVSX0FQSV9LRVkiLCJkZWZhdWx0SGVhZGVycyIsIk5FWFRfUFVCTElDX1NJVEVfVVJMIiwiTkVYVF9QVUJMSUNfU0lURV9OQU1FIiwiQ0hBVF9NT0RFTCIsIk5FWFRfUFVCTElDX09QRU5ST1VURVJfTU9ERUwiLCJQT1NUIiwicmVxIiwibWVzc2FnZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImNvbXBsZXRpb24iLCJjaGF0IiwiY29tcGxldGlvbnMiLCJjcmVhdGUiLCJtb2RlbCIsIm1lc3NhZ2VzIiwicm9sZSIsImNvbnRlbnQiLCJ0ZW1wZXJhdHVyZSIsIk5FWFRfUFVCTElDX0RFQlVHX01PREUiLCJjb25zb2xlIiwibG9nIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiaWQiLCJ1c2FnZSIsInJlc3BvbnNlIiwiY2hvaWNlcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_nikes_OneDrive_Desktop_Project_portfolio_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"export\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\nikes\\\\OneDrive\\\\Desktop\\\\Project\\\\portfolio\\\\app\\\\api\\\\chat\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_nikes_OneDrive_Desktop_Project_portfolio_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNuaWtlcyU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q1Byb2plY3QlNUNwb3J0Zm9saW8lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q25pa2VzJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDUHJvamVjdCU1Q3BvcnRmb2xpbyZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD1leHBvcnQmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaUM7QUFDOUc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXG5pa2VzXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcUHJvamVjdFxcXFxwb3J0Zm9saW9cXFxcYXBwXFxcXGFwaVxcXFxjaGF0XFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcImV4cG9ydFwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jaGF0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2hhdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY2hhdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXG5pa2VzXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcUHJvamVjdFxcXFxwb3J0Zm9saW9cXFxcYXBwXFxcXGFwaVxcXFxjaGF0XFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/openai"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cnikes%5COneDrive%5CDesktop%5CProject%5Cportfolio&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();