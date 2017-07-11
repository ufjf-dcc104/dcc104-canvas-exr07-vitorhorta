function AudioLoader(){
    this.audios = {};
    this.canais = [];

    for (var i = 0; i < 10; i++) {
        this.canais[i] = {
            audio: new Audio(),
            fim: -1
        };
    }
}

AudioLoader.prototype.load = function(key, url){
    this.audios[key] = new Audio();
    this.audios[key].src = url;
    this.audios[key].load();
};

AudioLoader.prototype.play = function(key, vol){
    var agora = new Date();
    for (var i = 0; i < this.canais.length; i++) {
        var canal = this.canais[i];
        if(canal.fim < agora.getTime()){
            canal.audio.src = this.audios[key].src;
            canal.fim = agora.getTime() + this.audios[key].duration * 1000;
            canal.audio.volume = vol?vol:1;
            canal.audio.play();
            break;
        }
    }
}