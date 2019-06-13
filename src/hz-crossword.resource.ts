/**
 * @module hz-crossword
 *//** */
import {$, EventEmitterFactory, Resource, ResourceController,ScormService,DataOptions} from "@haztivity/core";
import {CrosswordEvents} from "jq-crossword";

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
    //@ts-ignore
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
        //@ts-ignore
        this._config = config;
        this._$element.crossword(crosswordOptions);
        //@ts-ignore
        this._instance = this._$element.crossword("instance");
        this._assignEvents();
    }
    protected _assignEvents(){
        this._$element.on(CrosswordEvents.onSolved,{instance:this},this._onSolved);
    }
    protected _onSolved(e,data){
        let instance = e.data.instance;
        instance._markAsCompleted();
    }
    //@ts-ignore
    public disable(){
        if(super.disable()){
            this._$element.crossword("disable");
        }
    }
    //@ts-ignore
    public enable(){
        if(this._scormService.LMSIsInitialized() != true || this._options.attempts == -1 || this._availableAttempts > 0) {
            if (super.enable()) {
                this._$element.crossword("enable");
            }
        }
    }
}
