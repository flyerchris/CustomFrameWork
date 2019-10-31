import { Component } from "./Componet"
import hs from "./Customtext.html"

@Component.nameTag("customtext")
export class Customtext extends Component{
    @Component.accessor ctx: string = "hello fuck";
    private text: string = "jjjjj";
    constructor(){
        super(hs);
        let text = this.domElement.getElementsByTagName("ctx")[0];
        this.listenData("ctx", () =>{
            text.innerHTML = this.ctx;
        });
    }
}