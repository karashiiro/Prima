const eventBase = require("./message.js");

module.exports = async (client, logger, message) => {
    const member = message.member;
    if (!member.nickname) {
        const characterDB = (await client.db).db(client.dbName).collection("xivcharacters");
        const character = await characterDB.findOne({ id: member.id });
        let nickname = `(${character.world}) ${character.name}`;
        if (nickname.length > 32) {
            nickname = character.name;
        }
        await member.setNickname(nickname);
        logger.info(`Set nickname of ${member.user.tag} to ${nickname}.`);
    }

    return eventBase(client, logger, message);
};

module.exports.domain = "clerical";
