import header,{register} from '../header.js'
import { HtmlElement, createElement } from '../createHtml.js';

class MusicBox extends HtmlElement {
    constructor(obj)
    {
        super(obj);
        this.className += " m-container";
        this.file = obj.file;
        
    }
    active() {
        if(this.control) return;
        let playing = true;
        let audio = $(`<audio><source src="${this.file}.mp3" type="audio/mpeg"></audio>`);
        this.ref.append(audio);
        this.control = $(`<span class="music-control"></span>`);
        let playbutton = $("<i class='audio-play'></i>");
        this.control.append(playbutton)
        playbutton.click(function() {
            playing = !playing;
            if(playing) audio[0].play(); else audio[0].pause();
        })
        let timespan = $("<span class='audio-time'></span>");

        let timeline = $("<span class='time-line-back'><span class='time-line-for'></span></span>");
        this.control.append(timeline);
        
        this.control.append(timespan)
        this.ref.append(this.control);
        
        audio[0].oncanplay = function() {
            let dur = audio[0].buffered.end(window);
            audio[0].play();
            let playtime = audio[0].currentTime;
            timespan.html(`${playtime/60}:${playtime%60} / ${dur/60}:${dur%60}`)
            function to() {
                playtime = Math.floor(audio[0].currentTime);
                dur = Math.floor(audio[0].buffered.end(window));
                $(".time-line-for").css("width",`${playtime*100/dur}%`);
                let pm = Math.floor(playtime/60);
                let dm = Math.floor(dur/60);
                //console.log(playtime,dur);
                timespan.html(`${pm}:${playtime%60} / ${dm}:${dur%60}`)
                if(!audio[0].ended) {
                    setTimeout(()=>{to();},1000);
                }
            }
            to();
        }
        

    }
}

register( 'music',function() {
    $(".content-container").html("");
    let display = [
        {id:"nt",title:"nightTown",desp:"Nothing serious."}
        
    ];
    let display_real = [];
    display.map((e) => {
        display_real.push(new MusicBox({
            file: e.id,
            content: `<span class="m-title">${e.title}</span><span class="m-desp">${e.desp}</span>`}));

    })
    let t = new HtmlElement({className:"m-box",content:display_real});
    createElement(t,$(".content-container"));
    let active_id = 0;
    document.querySelector(".m-container").classList.add("m-container-selected");
    display_real[0].active();
    $(document).on("mousewheel",(e) => {
        //console.log(e.originalEvent);
        if(e.originalEvent.deltaY > 0) {
            active_id++;
        } else {
            active_id--;
        }
        active_id %= display_real.length;
        if(active_id < 0) active_id = display_real.length- 1;
        document.querySelector(".m-container-selected").classList.remove("m-container-selected");
        document.querySelectorAll(".m-container")[active_id].classList.add("m-container-selected");
    });
});

$(window).on("load",()=>{ 
    header("music");
    window.myreload.music();
});