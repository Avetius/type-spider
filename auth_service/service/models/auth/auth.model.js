'use strict';

import { Sequelize }   from '../../setup/sequelize.js';
import { auth_schema } from './auth.schema.js';

const Auth = Sequelize.define( 'Auth', auth_schema);

export default Auth;