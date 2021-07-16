exports.run =  (client, message, args) => {

    const content = message.content.split(" ").slice(1).join(" ");
    const result = new Promise((resolve, reject) => resolve(eval(content)));

    return result.then((output) => {
        if(typeof output !== "string"){
            output = require("util").inspect(output, { depth: 0 });
        }
        if(output.includes(client.token)){
            output = output.replace(message.client.token, "T0K3N");
        }
        message.channel.send(output, {
            code: "js"
        });  
    }).catch((err) => {
        err = err.toString();
        if(err.includes(message.client.token)){
            err = err.replace(message.client.token, "T0K3N");
        }
        message.channel.send(err, {
            code: "js"
        });
    });
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 4
};

exports.help = { 
name: 'eval', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};