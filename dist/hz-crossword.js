/**
 * @license hz-crossword v1.0.0
 * (c) 2018 Davinchi, Inc.
 * License MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@haztivity/core'), require('jq-crossword')) :
	typeof define === 'function' && define.amd ? define(['exports', '@haztivity/core', 'jq-crossword'], factory) :
	(factory((global.haztivityHzCrossword = {}),global.core,global.jqCrossword));
}(this, (function (exports,core,jqCrossword) { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @module hz-crossword
 */ /** */
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
        instance._scormService.doLMSSetValue("cmi.core.lesson_status", "completed");
        instance._scormService.doLMSSetValue("cmi.core.score.raw", 100);
        instance._scormService.doLMSCommit();
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
    var HzCrosswordResource_1;
}(core.ResourceController));

/**
 * @module hz-crossword
 * @preferred
 */ /** */

exports.HzCrosswordResource = HzCrosswordResource;

Object.defineProperty(exports, '__esModule', { value: true });

})));
