import dotenv from 'dotenv';

const { config } = dotenv;

export const dotenvConfig = () =>
  config({
    path: process.env.dotenv_config_path ? process.env.dotenv_config_path : '.env',
  });
