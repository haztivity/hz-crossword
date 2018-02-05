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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @module hz-crossword
 */ /** */
exports.HzCrosswordResource = HzCrosswordResource_1 = class HzCrosswordResource extends core.ResourceController {
    //@ts-ignore
    constructor(_$, _eventEmitterFactory, _scormService, _dataOptions) {
        super(_$, _eventEmitterFactory);
        this._scormService = _scormService;
        this._dataOptions = _dataOptions;
    }
    /**
     * @description Inicializa el objeto al inyectarse
     * @param {any}     options     Opciones
     * @param {any}     config      Configuración
     * @memberof HzAnimresource
     */
    init(options, config) {
        this._options = this._$.extend(true, {}, HzCrosswordResource_1._DEFAULT_OPTIONS, options);
        let crosswordOptions = this._dataOptions.getDataOptions(this._$element, "jqCrossword");
        //@ts-ignore
        this._config = config;
        this._$element.crossword(crosswordOptions);
        //@ts-ignore
        this._instance = this._$element.crossword("instance");
        this._assignEvents();
    }
    _assignEvents() {
        this._$element.on(jqCrossword.CrosswordEvents.onSolved, { instance: this }, this._onSolved);
    }
    _onSolved(e, data) {
        let instance = e.data.instance;
        instance._markAsCompleted();
        instance._scormService.doLMSSetValue("cmi.core.lesson_status", "completed");
        instance._scormService.doLMSSetValue("cmi.core.score.raw", 100);
        instance._scormService.doLMSCommit();
    }
    //@ts-ignore
    disable() {
        if (super.disable()) {
            this._$element.crossword("disable");
        }
    }
    //@ts-ignore
    enable() {
        if (this._scormService.LMSIsInitialized() != true || this._options.attempts == -1 || this._availableAttempts > 0) {
            if (super.enable()) {
                this._$element.crossword("enable");
            }
        }
    }
};
exports.HzCrosswordResource.NAMESPACE = "hzCrossword";
exports.HzCrosswordResource._DEFAULT_OPTIONS = {
    repeatable: true,
    with: {
        duration: 500
    }
};
exports.HzCrosswordResource = HzCrosswordResource_1 = __decorate([
    core.Resource({
        name: "HzCrossword",
        dependencies: [
            core.$,
            core.EventEmitterFactory,
            core.ScormService,
            core.DataOptions,
        ]
    })
], exports.HzCrosswordResource);
var HzCrosswordResource_1;

/**
 * @module hz-crossword
 * @preferred
 */ /** */

Object.defineProperty(exports, '__esModule', { value: true });

})));
