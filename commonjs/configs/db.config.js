export default db = {
    auth:[
        'priotix_auth',
        'postgres',
        'qwerty1',
        {
            host: 'localhost',
            dialect: 'postgres',
            logging: false,
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                iddle: 10000,
                acquire: 30000,
            },
            define: {
                timestamps: true,
                freezeTableName: true,
                underscored: true
            }
        }
    ],
    user:[
        'priotix_user',
        'postgres',
        'qwerty1',
        {
            host: 'localhost',
            dialect: 'postgres',
            logging: false,
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                iddle: 10000,
                acquire: 30000,
            },
            define: {
                timestamps: true,
                freezeTableName: true,
                underscored: true
            }
        }
    ],
    device:[
        'priotix_device',
        'postgres',
        'qwerty1',
        {
            host: 'localhost',
            dialect: 'postgres',
            logging: false,
            operatorsAliases: false,
            pool: {
                max: 5,
                min: 0,
                iddle: 10000,
                acquire: 30000,
            },
            define: {
                timestamps: true,
                freezeTableName: true,
                underscored: true
            }
        }
    ]
}