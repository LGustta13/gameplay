module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["inline-dotenv"]  // Para ter acesso as variáveis de ambiente
  };
};
