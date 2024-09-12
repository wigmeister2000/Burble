import Burble from "./burble.js";

export function registerConfigs() {
	game.settings.register(Burble.ID, Burble.SETTINGS.ON_OFF, {
		name: `Burble.settings.${Burble.SETTINGS.ON_OFF}.Name`,
		default: true,
		type: Boolean,
		scope: 'client',
		config: true,
		hint: `Burble.settings.${Burble.SETTINGS.ON_OFF}.Hint`,
		onChange: debouncedReload
	});
	game.settings.register(Burble.ID, Burble.SETTINGS.SPEECH_FONT, {
		name: `Burble.settings.${Burble.SETTINGS.SPEECH_FONT}.Name`,
		default: 'komika-slick',
		type: String,
		scope: 'client',
		config: true,
		choices: {
			"komika-slick": `Burble.settings.${Burble.SETTINGS.SPEECH_FONT}.komika-slick`,
			"komika-hand": `Burble.settings.${Burble.SETTINGS.SPEECH_FONT}.komika-hand`,
			"komika-slim": `Burble.settings.${Burble.SETTINGS.SPEECH_FONT}.komika-slim`,
			"komika-jam": `Burble.settings.${Burble.SETTINGS.SPEECH_FONT}.komika-jam`,
			"default": `Burble.settings.${Burble.SETTINGS.SPEECH_FONT}.default`
		},
		hint: `Burble.settings.${Burble.SETTINGS.SPEECH_FONT}.Hint`,
		onChange: debouncedReload
	});
}