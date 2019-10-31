import { Component } from "./Componet"
import { Customtext } from "./Customtext"
import hs from "./metronome.html"

@Component.nameTag("metronome")
export class Metronome extends Component {
    @Component.accessor bpm: number = 60;
    private aPrivateVar: number;

    constructor(){
        super(hs, [Customtext]);
        let text = this.domElement.getElementsByTagName("speed")[0];
        this.listenData("bpm", () =>{
            text.innerHTML = `${Math.round(this.bpm / 60 * 1000) / 1000}`;
        });// refactor, and id
    }
}