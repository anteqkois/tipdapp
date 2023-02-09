import dotenv from 'dotenv';

const { config } = dotenv;
config({
  path: process.env.dotenv_config_path ? process.env.dotenv_config_path : '.env',
});
