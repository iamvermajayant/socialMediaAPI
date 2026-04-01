const swaggerJsDoc = require('swagger-jsdoc');


const options = {
    definition: {
        openapi: '3.0.0',
        info : {
            title : 'Social Media API',
            version : '1.0.0',
            description : 'Social media REST API built with Node js, Express and Supabase'
        },
        servers : [
            {
                url : 'http://localhost:3000',
                description : 'Development Server'
            }
        ],
        components : {
            securitySchemes : {
                bearerAuth : {
                    type : 'http',
                    scheme : 'bearer',
                    bearerFormat : 'JWT',
                    description : 'Enter your supabase token here'
                }
            }
        },
        security : [{bearerAuth: []}]
    },
    apis : ['./routes/*.js']
}


const swaggerSpec = swaggerJsDoc(options)


module.exports = swaggerSpec;