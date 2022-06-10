const { MessageEmbed, Client } = require("discord.js");

module.exports = {
  name: "dhc",
  aliases: [],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let amount = args[0];
    let alts = args[1];
    let rate;
    let minutes = 0;
    let hours = 0;
    let days = 0;
    let seconds = 0;
    if (!amount) return message.channel.send("Please give me an amount.");
    if (!alts) alts = 1;

    let perMinute = 28000;
    let perSecond = 500;

    if (alts > 1) {
      rate = alts * 28000;
    } else {
      rate = 28000;
    }

    const converted =
      amount
        .replace(/m/, "000000")
        .replace(/k/, "000")
        .replace(/b/, "000000000") || amount;

    const num = Math.ceil(converted / 1000);
    for (i = 1; i <= num; i++) {
      seconds += 2;
    }

    if (converted >= 7000) {
      let mat = Math.ceil(converted / 7000);

      for (i = 1; i <= mat; i++) {
        seconds += 1;
      }
    }

    seconds = seconds / alts;

    if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
    }

    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      console.log(hours);
    }

    if (hours >= 24) {
      days = Math.floor(hours / 24);
    }

    const nf = new Intl.NumberFormat();
    const str = nf.format(converted);


    let newEmb = new MessageEmbed()
    .setTitle("DHC Calculator!")
    .setColor("RANDOM")
    .setFooter({ text: "by yaniel#0001" })
    .setDescription(
        `**Main:**\n\n> **Inputed Amount:** ${str}\n> **Calculated:** ${percentage(
            70,
            converted
          )}\n > **Estimated Time: ${seconds.toLocaleString()}s\n\n\n**Others:**\n\n> **Tax:** ${percentage(30, converted)}\n> **Bots/Alts:** ${alts.toLocaleString()}\n> **Rate:** ${rate.toLocaleString()}/minute`
    )

    let newEmb2 = new MessageEmbed()
    .setTitle("DHC Calculator!")
    .setColor("RANDOM")
    .setFooter({ text: "by yaniel#0001" })
    .setDescription(
        `**Main:**\n\n> **Inputed Amount:** ${str}\n> **Calculated:** ${percentage(
            70,
            converted
          )}\n > **Estimated Time: ${minutes.toLocaleString()}m ${seconds.toLocaleString()}s\n\n\n**Others:**\n\n> **Tax:** ${percentage(30, converted)}\n> **Bots/Alts:** ${alts.toLocaleString()}\n> **Rate:** ${rate.toLocaleString()}/minute`
    )

    let newEmb3 = new MessageEmbed()
    .setTitle("DHC Calculator!")
    .setColor("RANDOM")
    .setFooter({ text: "by yaniel#0001" })
    .setDescription(
        `**Main:**\n\n> **Inputed Amount:** ${str}\n> **Calculated:** ${percentage(
            70,
            converted
          )}\n > **Estimated Time: ${hours.toLocaleString()}h ${minutes.toLocaleString()}m ${seconds.toLocaleString()}s\n\n\n**Others:**\n\n> **Tax:** ${percentage(30, converted)}\n> **Bots/Alts:** ${alts.toLocaleString()}\n> **Rate:** ${rate.toLocaleString()}/minute`
    )

    let newEmb4 = new MessageEmbed()
    .setTitle("DHC Calculator!")
    .setColor("RANDOM")
    .setFooter({ text: "by yaniel#0001" })
    .setDescription(
        `**Main:**\n\n> **Inputed Amount:** ${str}\n> **Calculated:** ${percentage(
            70,
            converted
          )}\n > **Estimated Time**: ${days.toLocaleString()}d ${hours.toLocaleString()}h ${minutes.toLocaleString()}m ${seconds.toLocaleString()}s\n\n\n**Others:**\n\n> **Tax:** ${percentage(30, converted)}\n> **Bots/Alts:** ${alts.toLocaleString()}\n> **Rate:** ${rate.toLocaleString()}/minute`
    )



    if (days >= 1) {
      return message.channel.send({ embeds: [newEmb4] });
    } else if (hours >= 1) {
      return message.channel.send({ embeds: [newEmb3] });
    } else if (minutes >= 1) {
      return message.channel.send({ embeds: [newEmb2] });
    } else {
      return message.channel.send({ embeds: [newEmb] });
    }
  },
};

function percentage($sfa, $fsa) {
  let ans1 = $fsa / 100;
  let final = $sfa * ans1;
  return final.toLocaleString();
}
