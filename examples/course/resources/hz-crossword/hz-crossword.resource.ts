/**
 * @module hz-crossword
 *//** */
import {$, EventEmitterFactory, Resource, ResourceController,ScormService,DataOptions} from "@haztivity/core";
import {CrosswordEvents} from "jq-crossword";
/**
 * Haztivity resource wrapper for jq-crossword
 * @see https://github.com/davinchi-finsi/jq-crossword
 * @requires $
 * @requires EventEmitterFactory
 * @extends ResourceController
 */
@Resource(
    {
        name: "HzCrossword",
        dependencies: [
            $,
            EventEmitterFactory,
            ScormService,
            DataOptions,
        ]
    }
)
export class HzCrosswordResource extends ResourceController{
    public static readonly NAMESPACE = "hzCrossword";
    protected static readonly _DEFAULT_OPTIONS = {
        repeatable:true,
        with:{
            duration:500
        }
    };
    constructor(_$: JQueryStatic, _eventEmitterFactory,protected _scormService:ScormService, protected _dataOptions) {
        super(_$, _eventEmitterFactory);
    }
    /**
     * @description Inicializa el objeto al inyectarse
     * @param {any}     options     Opciones
     * @param {any}     config      Configuración
     * @memberof HzAnimresource
     */
    public init(options: any, config?: any): any {
        this._options = this._$.extend(true,{},HzCrosswordResource._DEFAULT_OPTIONS,options);
        let crosswordOptions  = this._dataOptions.getDataOptions(this._$element, "jqCrossword");
        this._config = config;
        this._$element.crossword(crosswordOptions);
        this._instance = this._$element.crossword("instance");
        this._assignEvents();
    }
    protected _assignEvents(){
        this._$element.on(CrosswordEvents.onSolved,{instance:this},this._onSolved);
    }
    protected _onSolved(e,data){
        let instance = e.data.instance;
        instance._markAsCompleted();
        instance._scormService.doLMSSetValue("cmi.core.lesson_status","completed");
        instance._scormService.doLMSSetValue("cmi.core.score.raw",100);
        instance._scormService.doLMSCommit();
    }
}