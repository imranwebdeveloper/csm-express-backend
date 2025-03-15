npx sequelize-cli migration:generate --name create-users
npx sequelize-cli migration:generate --name create-content

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
