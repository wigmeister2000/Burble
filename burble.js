import {registerConfigs} from "./config.js";

export default class Burble{
	static ID = 'fox-burble';
	static NAME = 'Burble';

	static SETTINGS = {
		SPEECH_FONT: 'speech-font',
		ON_OFF: 'on-off'
	}

	static loadCSS() {
		// Get HTML head element
		if (game.settings.get(Burble.ID,Burble.SETTINGS.ON_OFF)){
			
			var head = document.getElementsByTagName('HEAD')[0];
			
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = './modules/fox-burble/styles/main.css';
			head.appendChild(link);
		
			if (game.settings.get(Burble.ID,Burble.SETTINGS.SPEECH_FONT) != 'default'){
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = `./modules/fox-burble/styles/${game.settings.get(Burble.ID,Burble.SETTINGS.SPEECH_FONT)}.css`;
				head.appendChild(link);
			}
			
			if (['dnd4e','blades-in-the-dark'].includes(game.system.id)){
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = `./modules/fox-burble/styles/${game.system.id}.css`;
				head.appendChild(link);
			
				if ('dnd4e' == game.system.id){
					if (game.settings.get("dnd4e","darkMode")){
						link = document.createElement('link');
						link.rel = 'stylesheet';
						link.type = 'text/css';
						link.href = './modules/fox-burble/styles/dnd4e_dark.css';
						head.appendChild(link);
					}
				}
			}
		
		}
	}
}

Hooks.once('init', () => {
	registerConfigs();
	Burble.loadCSS();
});

Hooks.on('renderChatMessage', async function(message, html, data){
	if(!game.settings.get(Burble.ID,Burble.SETTINGS.ON_OFF)) return;
	
	console.log(data);
	html[0].classList.add('burble');
	if(data?.cssClass=="emote") return;
	
	if(message.isRoll){
		html[0].classList.add('roll');
		if(message.flags?.core?.initiativeRoll){
			html[0].classList.add('notice');
		}else if(message.content.startsWith('<div class="table-draw')){
			html[0].classList.add('roll-table','notice');
		}
	}else if( data?.cssClass=="ic" || (!message.speaker?.actor && !message.content.startsWith("<"))){
		html[0].classList.add('speech');
	}else{
		html[0].classList.add('notice');
		if(message?.flavor == 'Item Piles'){
			html[0].classList.add('item-piles');
		}
	}
	
	if(!message.speaker?.token && !html[0].classList.contains('narrator-chat')){
		html[0].classList.add('system-message');
	}
	
	//Special for D&D4e compatibility
	if (['dnd4e'].includes(game.system.id)){
		
		if(message.isRoll){
			if(data.message?.rolls[0].search("RollWithOriginalExpression") > 0){
				html[0].classList.add('notice');
			}
		}
		
		if(message.content.startsWith('<div class="dnd4e')){
			let cardContainer;
			let buttonElement;
			let panelElement;
			
			if(message.content.startsWith('<div class="dnd4e chat-card')){
				html[0].classList.add('chat-card');
				html[0].classList.remove('notice');
				cardContainer = html.find(".chat-card")[0];
				buttonElement = html.find(".card-buttons")[0];
				panelElement = html.find(".effects-tray")[0];
			}else if(message.content.startsWith('<div class="dnd4e dot-report')){
				html[0].classList.add('dot-report');
				cardContainer = html.find(".dot-report")[0].parentElement;
				buttonElement = html.find(".chatDamageButtons")[0];
				panelElement = html.find(".effects-tray")[0];
			}
			
			if(buttonElement){
				cardContainer.appendChild(buttonElement);
			}
			if(panelElement){
				cardContainer.appendChild(panelElement);
			}
		}
	}
});
