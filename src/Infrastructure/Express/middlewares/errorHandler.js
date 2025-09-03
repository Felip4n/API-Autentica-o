const erroHandler = (err, req, res, next) => {
    console.error(err.stack);//Log do erro no console para depuração

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        message: message, 
        //Em produção, evita enviar detalhes de erros internos
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = erroHandler;