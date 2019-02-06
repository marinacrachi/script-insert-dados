/**
 * 
 * Script de  inserção de dados no banco
 * 
 *  ==> O script irá ler a pasta 'file', as subpastas e os arquivos dentro delas:
 * |- file
 *  |- folder 2
 *    |-- File1.json
 *    |-- File2.json
 *    |-- Etc 
 *  |- folder 2
 *    |-- File1.json
 *    |-- File2.json
 *    |-- Etc 
 * 
 */

const express = require('express')
const app = express()
const port = 3000
var fs = require('fs');
var request = require('request');
var url = ''

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)

    fs.readdir('./file', function (err, pastas) {
        pastas.forEach(pasta => {
            fs.readdir('./file/' + pasta, function (err, arquivos) {
                arquivos.forEach((arquivo) => {
                    fs.readFile('./file/' + pasta + '/' + arquivo, 'utf8', function (err, contents) {

                        // Remove o último caractere do arquivo (verificar se o último caractere do json é uma vírgula)
                        contents = contents.substring(0, contents.length - 1);
                        // Transforma o conteúdo em um array de objetos
                        contents = "[" + contents + "]";

                        request.post(
                            url,
                            { json: { answers: contents } },                // ==> verificar como o array de jsons deve ser recebido
                            function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    console.log('ok')
                                }
                            }
                        );

                    })
                })
            })
        });
    })
})