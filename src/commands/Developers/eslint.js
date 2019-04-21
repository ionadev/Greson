const { Command } = require("klasa");
const { Linter } = require("eslint");
const { MessageEmbed } = require("discord.js");

class Eslint extends Command {
    constructor(...args) {
        super(...args , {
            description: "View Info About An Eslint Rule.",
            usage: "<rule:str>"
        });
        this.linter = new Linter();
    }

    async run(msg,[rule]) {
        rule = rule.replace(/ /g,"-").trim().toLowerCase();
        const rules = this.linter.getRules();
        if(!rules.has(rule)) throw "Rule Not Found!";
        const info = rules.get(rule).meta.docs;
        const embed = new MessageEmbed()
            .setTitle(rule)
            .setURL(info.url)
            .setDescription(info.description)
            .addField("Category" , info.category)
            .addField("Recommended", info.recommended.toString())
            .setFooter(`eslint v${this.linter.version}`)
            .setColor(0xff0000)
            .setAuthor(msg.author.tag,msg.author.displayAvatarURL());

        return msg.send({ embed });
    }
}

module.exports = Eslint;