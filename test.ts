import { Metronome } from "./Metornome"
import { Customtext } from "./Customtext"
import { Component} from "./Componet"
Component.use([Metronome, Customtext]);

let testinput = document.getElementById("testinput");
Metronome.instance["aa"].twoDataBinding("bpm", testinput, () => {
    (<HTMLInputElement>testinput).value = String((<Metronome>Metronome.instance["aa"])["bpm"]);
});
console.log(Metronome.instance["aa"].getChild("btx"));