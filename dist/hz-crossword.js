/**
 * @license hz-crossword v0.7.0
 * (c) 2019 Davinchi, Inc.
 * License MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@haztivity/core'), require('jq-crossword')) :
    typeof define === 'function' && define.amd ? define(['exports', '@haztivity/core', 'jq-crossword'], factory) :
    (global = global || self, factory(global.haztivityHzCrossword = {}, global.core, global.jqCrossword));
}(this, function (exports, core, jqCrossword) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var HzCrosswordResource = /** @class */ (function (_super) {
        __extends(HzCrosswordResource, _super);
        //@ts-ignore
        function HzCrosswordResource(_$, _eventEmitterFactory, _scormService, _dataOptions) {
            var _this = _super.call(this, _$, _eventEmitterFactory) || this;
            _this._scormService = _scormService;
            _this._dataOptions = _dataOptions;
            return _this;
        }
        HzCrosswordResource_1 = HzCrosswordResource;
        /**
         * @description Inicializa el objeto al inyectarse
         * @param {any}     options     Opciones
         * @param {any}     config      Configuración
         * @memberof HzAnimresource
         */
        HzCrosswordResource.prototype.init = function (options, config) {
            this._options = this._$.extend(true, {}, HzCrosswordResource_1._DEFAULT_OPTIONS, options);
            var crosswordOptions = this._dataOptions.getDataOptions(this._$element, "jqCrossword");
            //@ts-ignore
            this._config = config;
            this._$element.crossword(crosswordOptions);
            //@ts-ignore
            this._instance = this._$element.crossword("instance");
            this._assignEvents();
        };
        HzCrosswordResource.prototype._assignEvents = function () {
            this._$element.on(jqCrossword.CrosswordEvents.onSolved, { instance: this }, this._onSolved);
        };
        HzCrosswordResource.prototype._onSolved = function (e, data) {
            var instance = e.data.instance;
            instance._markAsCompleted();
        };
        //@ts-ignore
        HzCrosswordResource.prototype.disable = function () {
            if (_super.prototype.disable.call(this)) {
                this._$element.crossword("disable");
            }
        };
        //@ts-ignore
        HzCrosswordResource.prototype.enable = function () {
            if (this._scormService.LMSIsInitialized() != true || this._options.attempts == -1 || this._availableAttempts > 0) {
                if (_super.prototype.enable.call(this)) {
                    this._$element.crossword("enable");
                }
            }
        };
        var HzCrosswordResource_1;
        HzCrosswordResource.NAMESPACE = "hzCrossword";
        HzCrosswordResource._DEFAULT_OPTIONS = {
            repeatable: true,
            "with": {
                duration: 500
            }
        };
        HzCrosswordResource = HzCrosswordResource_1 = __decorate([
            core.Resource({
                name: "HzCrossword",
                dependencies: [
                    core.$,
                    core.EventEmitterFactory,
                    core.ScormService,
                    core.DataOptions,
                ]
            })
        ], HzCrosswordResource);
        return HzCrosswordResource;
    }(core.ResourceController));

    /**
     * @module hz-crossword
     * @preferred
     */ /** */

    exports.HzCrosswordResource = HzCrosswordResource;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
