const ITokenBlackListRepository = require('src/Domain/Repositories/ITokenBlackListRepository');
const { redisClient } = require('./RedisClient');

class RedisTokenBlacklistRepository extends ITokenBlackListRepository {
    async add(token, expiresIn) {
        // Adiciona o token à blacklist com tempo de expiração
        // expiresIn deve ser em segundos
        await redisClient.setEx(`blacklist:${token}`, expiresIn, 'blocked');
    }

    async exists(token) {
        // Verifica se o token existe na blacklist
        const result = await redisClient.exists(`blacklist:${token}`);
        return result === 1; // Redis retorna 1 se existe, 0 se não existe
    }
}

module.exports = RedisTokenBlacklistRepository;