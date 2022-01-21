1. В root папке должен быть файл .jks сгенерированный keystore (элетронная подпись, нужна для google play)
 - Если проебу, то поискать в google play console, credentials или в expo
 - Если совсем не нашел, то у тех поддержки google play можно попросить

2. Для каждого нового релиза:
 - нужно увеличивать значение на 1 в app.json->expo->android->versionCode (нужно для google play)
 - не забыть изменить app.json->expo->version

3. Для push уведомлений
 - [google play] должен быть файл google-services.json сгенерированный в firebase для desfam проекта
 - [google play] в файле google-services.json client->api_key->current_key должен совпадать с Android key (auto created by Firebase)
   (в console.cloud.google.com/apis/credentials)

4. Что бы сбросить кеш (особенно когда меяешь .env)
  - запускаешь expo start --clear
  - для web не работает очистка кеша для .env (пока хз как решить)
