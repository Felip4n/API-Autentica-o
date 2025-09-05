const tokenBlacklistRepository = new (require('../../Persistence/Redis/RedisTokenBlacklistRepository'))();

module.exports = (jwtProvider) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Nenhum token fornecido ou formato inválido.' });
        }
        
        const token = authHeader.split(' ')[1];
        
        try {
            const isBlacklisted = await tokenBlacklistRepository.exists(token);
            if (isBlacklisted) {
                return res.status(401).json({ status: 'error', message: 'Token revogado.' });
            }
            
            const decoded = jwtProvider.verifyToken(token);
            
            req.user = decoded;
            req.token = token;
            next();
        } catch (error) {
            return res.status(401).json({ status: 'error', message: 'Token inválido.' });
        }
    };
};