export class Component{
    static instance: {[key: string]: Component};
    static tagName: string;
    parent: Component;
    protected children: {[key: string]: Component} = {};
    protected data: {[key:string]: any} = {};
    protected domElement: HTMLElement;

    static accessor(target: any, attr: string){
        Object.defineProperty(target, attr, {
            get: function(){
                this.addNewDataContainer(attr);
                return this.data[attr].value;
            },
            set: function(val){
                this.addNewDataContainer(attr);
                this.data[attr].value = val;
                let handler = this.data[attr].handler;
                for(let i = 0; i < handler.length; i++){
                    handler[i]();
                }
            }
        });
    }

    static nameTag(tagName: string) {
        return function(target: any){
            target["tagName"] = tagName;
            target["instance"] = {};
        }
    }

    static use(comp: typeof Component[], dom: HTMLElement = document.body, storage: Component = null){
        let tags: HTMLElement[][] = [];
        for(let i = 0; i < comp.length; i++){
            tags.push(<HTMLElement[]>Array.from(dom.getElementsByTagName(comp[i].tagName)));
        }
        for(let i = 0; i < comp.length; i++){
            let items = tags[i];
            for(let j = 0; j < items.length; j++){
                let parentEle = items[j].parentElement;
                let nc = new comp[i]();
                for(let key in items[j].dataset){
                    if(!nc.hasOwnProperty(key) && (<any>nc)[key]){
                        (<any>nc)[key] = items[j].dataset[key];
                    }
                }

                let targetStore: {[key: string]: Component} = comp[i].instance;
                if(storage) targetStore = storage.children;
                targetStore[j] = nc;
                    if(items[j].id) targetStore[items[j].id] = nc;
                if(storage)nc.parent = storage;
                
                
                parentEle.insertBefore(nc.domElement, items[j]);
                parentEle.removeChild(items[j]);
            }
        }
    }

    constructor(ds: string = "", comp: typeof Component[] = []){
        this.domElement = document.createElement("div");
        this.domElement.innerHTML = ds;
        Component.use(comp, this.domElement, this);
    }

    twoDataBinding(dataName: string, element: HTMLElement, handler: Function){
        if(!this.data[dataName]) this.addNewDataContainer(dataName, null);
        this.data[dataName].handler.push(handler);
        this.data[dataName].bindElements.push(element);
        if(element){
            let listener =  (e: Event) => {
                (<any>this)[dataName] = (<HTMLInputElement>element).value;
            }
            element.addEventListener("input", listener);
            element.addEventListener("DOMCharacterDataModified", listener, false);
        }
        handler();
    }

    listenData(dataName: string, handler: Function){
        this.twoDataBinding(dataName, null, handler);
    }

    getChild(name: string | number): Component{
        return this.children[name];
    }

    private addNewDataContainer(dataName:string, value: string | number = ""): object{
        if(!this.data) this.data = {};
        if(this.data[dataName]) return null;
        this.data[dataName] = {
            'value': value,
            'bindElements': [],
            'handler': []
        };
        return this.data[dataName];
    }
}
