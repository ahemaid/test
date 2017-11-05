var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var  jsonfile  =  require('jsonfile');
var shell = require('shelljs');

app.use(bodyParser.urlencoded({
  extended: true
}));

// check if the userConfigurations file is exist
// for the first time of app running
var path = "../jsonDataFiles/userConfigurations.json";
fs.exists(path, function(exists) {
  if (exists) {
    jsonfile.readFile(path, function(err, obj)  {
      if (err)
        console.log(err);
      // dispaly the configurations     
      console.log(obj);


      // TODO:otherBranchesHeader.html
      //   contents = fs.readFileSync('templates/baseOtherBranchesHeader.html', 'utf8');
      //
      //   if(documentationGeneration==='schemaOrgChecked'){
      //         contents = contents.replace('<!--Schema', "");
      //         contents = contents.replace('Schema-->', "");
      //    }
      //    else if(documentationGeneration==='widocoChecked'){
      //         contents = contents.replace('<!--Widoco', "");
      //         contents = contents.replace('Widoco-->', "");
      //    }
      //
      //    if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
      //         contents = contents.replace('<!--SyntaxValidation', "");
      //         contents = contents.replace('SyntaxValidation-->', "");
      //    }
      //
      //
      //    fs.writeFile("templates/otherBranchesHeader.html", contents, function(err) {
      //         if(err) {
      //             return console.log(err);
      //         }
      //    });
      //
      //
      //    console.log('File otherBranchesHeader.html saved.');
      //
      //
      //    contents = fs.readFileSync('templates/syntaxErrorsTemplate.html', 'utf8');
      //
      //    contents = contents.replace('errors_to_replace', "");
      //
      //    fs.writeFile("/home/vagrant/schemaorg/docs/syntax_validation.html", contents, function(err) {
      //         if(err) {
      //             return console.log(err);
      //         }
      //    });
      //
      //    console.log('File syntax_validation.html saved.');
      //
      //
      //    contents = fs.readFileSync('templates/mainBranchScriptTemplate.txt', 'utf8');
      //
      //    var documentationGeneration = req.body.documentationGeneration;
      //
      //
      //    var subdomain = '';
      //    var subParts = req.body.server.split('/');
      //
      //    if(subParts.length > 3) {
      //     for (var i = 3; i < subParts.length; i++) {
      //      subdomain += subParts[i] +'/';
      //      }
      //    }
      //
      //    contents = contents.replace(/#subdomain/, subdomain);
      //
      //
      //    if(documentationGeneration==='schemaOrgChecked'){
      //         contents = contents.replace(/#SchemaOrg/g, "");
      //    }
      //    else if(documentationGeneration==='widocoChecked'){
      //         contents = contents.replace(/#Widoco/g, "");
      //    }
      //
      //    if(req.body.visualization==='visualizationChecked'){
      //         contents = contents.replace(/#Visualization/g, "");
      //    }
      //
      //    if(req.body.sparqlEndPoint==='sparqlEndPointChecked'){
      //         contents = contents.replace(/#Sparql/g, "");
      //    }
      //
      //    if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
      //         contents = contents.replace(/#SyntaxValidationReport/g, "");
      //    }
      //
      //    if(req.body.evolutionReport==='evolutionReportChecked'){
      //         contents = contents.replace(/#Evolution/g, "");
      //    }
      //
      //    if(req.body.rdfxml==='rdfxmlChecked'){
      //         contents = contents.replace(/#RdfXml/g, "");
      //    }
      //
      //    if(req.body.ntriples==='ntriplesChecked'){
      //         contents = contents.replace(/#Ntriples/g, "");
      //    }
      //    if(req.body.predefinedQueries==='predefinedQueriesChecked'){
      //         contents = contents.replace(/#PredefinedQueries/g, "");
      //    }
      //
      //    var syntaxValidation = req.body.syntaxValidation;
      //
      //    if(syntaxValidation==='rapperChecked'){
      //         contents = contents.replace(/#Rapper/g, "");
      //    }
      //    else if(syntaxValidation==='jenaRiotChecked'){
      //         contents = contents.replace(/#JenaRiot/g, "");
      //    }
      //
      //    fs.writeFile("mainBranchScript.sh", contents, function(err) {
      //         if(err) {
      //             return console.log(err);
      //         }
      //    });
      //
      //    console.log('File webHookScript.sh saved.');
      //
      //    contents = fs.readFileSync('templates/otherBranchesScriptTemplate.txt', 'utf8');
      //
      //    contents = contents.replace(/#subdomain/, subdomain+'/');
      //
      //    var documentationGeneration = req.body.documentationGeneration;
      //
      //    if(documentationGeneration==='schemaOrgChecked'){
      //         contents = contents.replace(/#SchemaOrg/g, "");
      //    }
      //    else if(documentationGeneration==='widocoChecked'){
      //         contents = contents.replace(/#Widoco/g, "");
      //    }
      //
      //    if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
      //         contents = contents.replace(/#SyntaxValidationReport/g, "");
      //    }
      //
      //    var syntaxValidation = req.body.syntaxValidation;
      //
      //    if(syntaxValidation==='rapperChecked'){
      //         contents = contents.replace(/#Rapper/g, "");
      //    }
      //
      //    else if(syntaxValidation==='jenaRiotChecked'){
      //         contents = contents.replace(/#JenaRiot/g, "");
      //    }
      //
      //    fs.writeFile("otherBranchesScript.sh", contents, function(err) {
      //         if(err) {
      //             return console.log(err);
      //         }
      //    });
      //
      //    console.log('File otherBranchesScript.sh saved.');
      //
      //
      //    contents = fs.readFileSync('templates/homepageTemplate.txt', 'utf8');
      //
      //    var documentationGeneration = req.body.documentationGeneration;
      //
      //    contents = contents.replace('<title> </title>', '<title>'+req.body.vocabularyName+'</title>');
      //
      //    contents = contents.replace('<div> </div>', req.body.homepageContent);
      //
      //    fs.writeFile("/home/vagrant/schemaorg/templates/homepage.tpl", contents, function(err) {
      //         if(err) {
      //             return console.log(err);
      //         }
      //    });
      //
      //    console.log('File homepage.tpl saved.');
      //
      //
      //
      //    var contents = fs.readFileSync('templates/templateConfiguration_Page.html', 'utf8');
      //
      // contents = contents.replace('VocabularyNameVal', req.body.vocabularyName);
      //
      // contents = contents.replace('DomainNameVal', req.body.server);
      //
      // contents = contents.replace('RepositoryVal', req.body.repository);
      //
      // contents = contents.replace('BranchNameVal', req.body.branchName);
      //
      // contents = contents.replace('UserVal', req.body.user);
      //
      //
      // if(req.body.clientHooks==='clientHooksChecked'){
      //   contents = contents.replace('ClientSideVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('ClientSideVal', '');
      // }
      //
      // if(req.body.formatting==='formattingChecked'){
      //   contents = contents.replace('FormattingVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('FormattingVal', '');
      // }
      //
      // if(req.body.webHook==='webHookChecked'){
      //   contents = contents.replace('WebHookVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('WebHookVal', '');
      // }
      //
      // if(req.body.turtleEditor==='turtleEditorChecked'){
      //   contents = contents.replace('TurtleEditorVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('TurtleEditorVal', '');
      // }
      //
      // if(req.body.syntaxValidation==='rapperChecked'){
      //   contents = contents.replace('SyntaxValidationRapperVal', 'checked');
      //   contents = contents.replace('SyntaxValidationJenaRiotVal', '');
      // }
      // else {
      //   contents = contents.replace('SyntaxValidationRapperVal', '');
      //   contents = contents.replace('SyntaxValidationJenaRiotVal', 'checked');
      // }
      //
      // if(req.body.documentationGeneration==='schemaOrgChecked'){
      //   contents = contents.replace('DocumentationGenerationSchemaOrgVal', 'checked');
      //   contents = contents.replace('DocumentationGenerationWidocoVal', '');
      // }
      // else {
      //   contents = contents.replace('DocumentationGenerationWidocoVal', 'checked');
      //   contents = contents.replace('DocumentationGenerationSchemaOrgVal', '');
      // }
      //
      // if(req.body.visualization==='visualizationChecked'){
      //   contents = contents.replace('VisualizationVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('VisualizationVal', '');
      // }
      //
      // if(req.body.sparqlEndPoint==='sparqlEndPointChecked'){
      //   contents = contents.replace('SpaqlEndPointVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('SpaqlEndPointVal', '');
      // }
      //
      // if(req.body.syntaxValidationReport==='syntaxValidationReportChecked'){
      //   contents = contents.replace('SyntaxValidationReportVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('SyntaxValidationReportVal', '');
      // }
      //
      // if(req.body.evolutionReport==='evolutionReportChecked'){
      //   contents = contents.replace('SchemaEvolutionReportVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('SchemaEvolutionReportVal', '');
      // }
      //
      // if(req.body.otherBranches==='otherBranchesChecked'){
      //   contents = contents.replace('OtherBranchesVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('OtherBranchesVal', '');
      // }
      //
      // if(req.body.ntriples==='ntriplesChecked'){
      //   contents = contents.replace('NTriplesVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('NTriplesVal', '');
      // }
      //
      // if(req.body.rdfxml==='rdfxmlChecked'){
      //   contents = contents.replace('RdfXMLVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('RdfXMLVal', '');
      // }
      //
      // if(req.body.predefinedQueries==='predefinedQueriesChecked'){
      //   contents = contents.replace('PredefinedQueriesVal', 'checked');
      // }
      // else {
      //   contents = contents.replace('PredefinedQueriesVal', '');
      // }
      //
      //
      // contents = contents.replace('HomepageContentVal', req.body.homepageContent);
      //
      //    fs.writeFile("/home/vagrant/schemaorg/docs/configuration_page.html", contents, function(err) {
      //         if(err) {
      //             return console.log(err);
      //         }
      //    });
      //
      //    console.log('File configuration_page.html saved.');
      //
      //


      //TODO: startupTemplate configuration
      // shell.exec('pwd').stdout;
      // //startup.sh
      // var contents = fs.readFileSync('../templates/startupTemplate.txt', 'utf8');
      //
      // var syntaxValidation = obj.syntaxValidation;
      //
      // if (obj.hasOwnProperty('clientHooks')) {
      //
      //   contents = contents.replace(/#ClientServices/g, '');
      //
      //   contents = contents.replace(/validationTool/g, syntaxValidation);
      //
      //   // TODO:check formatting below
      //   //contents = contents.replace(/formatting/g, req.body.formatting);
      //
      // }
      // // TODO:check the location of script
      // fs.writeFile("../scripts/startup.sh", contents, function(err) {
      //   if (err) {
      //     return console.log(err);
      //   }
      // });
      //
      // console.log('File startup.sh saved.');


      // TODO:qonsole-config.js
      //  contents = fs.readFileSync('templates/templateQonsole-config.js', 'utf8');
      //
      //
      //      var exampleQueries = `
      //
      //     { "name": "Selection of triples",
      //       "query": "SELECT ?subject ?predicate ?object\\nWHERE { " +
      //                "  ?subject ?predicate ?object\\n}\\n" +
      //                "LIMIT 25"
      //     },
      //     { "name": "Selection of classes",
      //       "query": "SELECT DISTINCT ?class ?label ?description\\nWHERE {\\n" +
      //                "  ?class a owl:Class.\\n" +
      //                "  OPTIONAL { ?class rdfs:label ?label}\\n" +
      //                "  OPTIONAL { ?class rdfs:comment ?description}\\n}\\n" +
      //                "LIMIT 25",
      //       "prefixes": ["owl", "rdfs"]
      //     }
      //
      // `;
      //
      //    contents = contents.replace('#PredefinedQueries', exampleQueries);
      //
      //
      //  fs.writeFile("/home/vagrant/fuseki/apache-jena-fuseki-2.3.0/webapp/js/app/qonsole-config.js", contents, function(err) {
      //       if(err) {
      //           return console.log(err);
      //       }
      //  });
      //
      //  console.log('File qonsole-config.js saved.');
      //


      //repoConfiguration.sh
      // var repository = obj.repository.trim();
      // repository = repository.split(".git");
      // console.log(repository);



      //  contents = fs.readFileSync('../templates/repoConfigurationTemplate.txt', 'utf8');

      //  contents = contents.replace('repositoryParam', obj.repositoryURL);
      //  contents = contents.replace('serverParam', obj.server);
      //  contents = contents.replace('userParam', obj.user);
      //  contents = contents.replace('passwordParam', obj.password);

      //  contents = contents.replace('clientHooksParam', (obj.hasOwnProperty('clientHooks')) ? "clientHooksChecked" : "isNotChecked");
      //  contents = contents.replace('webHookParam', (obj.hasOwnProperty('webHook')) ? "webHookChecked" : "isNotChecked");
      //  contents = contents.replace('turtleEditorParam',(obj.turtleEditor === "true") ? "turtleEditorChecked" : "isNotChecked");
      //
      //  contents = contents.replace('repoNameOnlyParam', obj.repositoryName);

      // TODO: import repoConfigurationTemplate to do the task here

      // give permission to the root of the project
      shell.cd('../..');
      //shell.exec('chmod -R u+x .');
      //shell.echo('echo File repoConfiguration.sh saved..');
      //shell.exec('sh scripts/repoConfiguration.sh ');

      //var repository = obj.repositoryURL;
      //var server = obj.server;
      //var user = obj.user;
      //var password = obj.password;

      var clientHooks = (obj.hasOwnProperty('clientHooks')) ? true : false;
      var webHook = (obj.hasOwnProperty('webHook')) ? true : false;
      var turtleEditor = (obj.turtleEditor === "true") ? true : false;
      //var repoNameOnly = obj.repositoryName;

      // #GitLab repositoryNamespace=${repository:19}
      // #GitLab repositoryService="GitLab"
      //
      // #BitBucket repositoryNamespace=${repository:22}
      // #BitBucket repositoryService="BitBucket"

      //fullRepositoryURL="${repository}.git"
      //repositoryService="GitHub"

      // #GitLab fullRepositoryURL="${repository}.git"
      //
      // #BitBucket fullRepositoryURL=https://bitbucket.org/"${repositoryNamespace}".git

      var removeHistory = false;

      //#echo "${repository:0:8}${user}:${password}@${repository:8}.git"

      //TODO: to make the below command
      //source .nvm/nvm.sh
      //shell.exec('source .nvm/nvm.sh');

      shell.exec('pwd', {
        silent: false
      }).stdout;
      var path = "./repoFolder";
      if (fs.existsSync(path)) {
        console.log("folder is exist");
        shell.cd("repoFolder");
        var localRepository = shell.exec('git ls-remote --get-url', {
          silent: false
        }).stdout;
        //TODO*:check the correct format to login with username and password
        console.log("loginWithUsernameandPass  " + 'https://' + obj.user + ':' + obj.password + '@' + obj.repositoryURL.slice(8) + '.git');
        // check if the localRepository same same entered config
        if (localRepository === obj.repositoryURL || localRepository === 'https://' + obj.user + ':' + obj.password + '@' + obj.repositoryURL.slice(8) + '.git') {
          console.log('ready to pull');
          shell.exec('git checkout master', {
            silent: false
          }).stdout;
          shell.exec('git reset --hard', {
            silent: false
          }).stdout;
          shell.exec('git pull', {
            silent: false
          }).stdout;
        } else {
          shell.cd("..");
          shell.rm("-rf", "repoFolder");
          //TODO*:change  the following login
          //shell.exec('git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder',{silent:false}).stdout;
          shell.exec('git clone "' + obj.repositoryURL + '" repoFolder', {
            silent: false
          }).stdout;
          shell.cd("repoFolder");
          removeHistory = true;
        }
      } else {
        //TODO*:change  the following login
        //shell.exec('git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder',{silent:false}).stdout;
        shell.exec('git clone "' + obj.repositoryURL + '" repoFolder', {
          silent: false
        }).stdout;
        shell.cd("repoFolder");
        removeHistory = true;
      }
      //********************************************************************
      //********************************************************************
      //var child2 = shell.exec('-d "test"',{async:true});
      //console.log(child2);
      // if [ -d "repoFolder" ]; then
      //
      // cd repoFolder
      //
      // localRepository=$(git ls-remote --get-url)
      //
      //  if [ "$localRepository" = "$fullRepositoryURL" ] || [ "$localRepository" = "${repository:0:8}${user}:${password}@${repository:8}.git" ]; then
      //     git checkout master
      //     git reset --hard
      //     git pull
      //  else
      //     cd ..
      //     rm -r -f repoFolder
      //     git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder
      //     cd repoFolder
      //     removeHistory=true
      //  fi
      //  else
      //     git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder
      //     cd repoFolder
      //     removeHistory=true
      // fi
      //
      //
      //********************************************************************
      //********************************************************************

      //TODO:if client hooks is clicked then add then otherwise remove it
      // if [ ! -d "VoColClient" ]; then
      //  git rm -r -f VoColClient
      // fi
      //
      //


      ////////////////////////////////////////////////////////////////////
      // client hooks
      ////////////////////////////////////////////////////////////////////
      //TODO: just disable for testing perpose
      if (obj.clientHooks === "true") {
        shell.exec("pwd"); // in repoFolder path

        shell.cd("../repoFolder"); // in repoFolder path
        //shell.mkdir('-p', 'VoColClient');
        shell.cp('-r', '../VoColApp/helper/tools/VoColClient/Hooks', 'VoColClient/');
        shell.cd('-p', 'VoColClient/Hooks');
        //TODO:
        var serverURL = "${" + obj.server + "//\//\\/}"
        //
        shell.sed('-i',  "s/ServerURL/"+serverURL+"/g" +' pre-commit', {
          silent: false
        }).stdout;
        shell.exec('pwd');
        shell.cd("../../repoFolder"); // in repoFolder path
        shell.exec('git config user.email "' + obj.user + '@vocol.com"', {
          silent: false
        }).stdout;
        shell.exec('git config user.name ' + obj.user, {
          silent: false
        }).stdout;
        shell.exec('git add .', {
          silent: false
        }).stdout;
        shell.exec('git commit -m "configuration of repository"', {
          silent: false
        }).stdout;
        //TODO*:change  the following login
        //shell.exec('git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder',{silent:false}).stdout;
        if (obj.repositoryService === 'gitHub')
          shell.exec('"https://'+obj.user+':'+obj.password+'@' + obj.repositoryURL.slice(8) + '.git" repoFolder', {
            silent: false
          }).stdout;
        else if (obj.repositoryService === 'gitLab')
          shell.exec('git push https://' + obj.user + ':' + obj.password + '@gitlab.com/"' + obj.repositoryName + '".git master', {
            silent: false
          }).stdout;
        else if (obj.repositoryService === 'BitBucket')
          shell.exec('git push https://' + obj.user + ':' + obj.password + '@bitbucket.org/"' + obj.repositoryName + '".git', {
            silent: false
          }).stdout;
        // #GitLab git push https://${user}:${password}@gitlab.com/"${repositoryNamespace}".git master

        //  git push "${repository:0:8}${user}:${password}@${repository:8}.git"
        //
        //
        // #BitBucket git push https://${user}:${password}@bitbucket.org/"${repositoryNamespace}".git
        //
        shell.cd('..'); //VoColClient
        //TODO*: do we need to do  the below commands
        // fuser -k 3002/tcp
        // node clientServices.js "Rapper" "consistencyChecking" "constraintChecking" "formatting" &
      }

      ////////////////////////////////////////////////////////////////////
      //// clientHooks
      //////////////////////////////////////////////////////////////////////


      // +if [ "$clientHooks" == "clientHooksChecked" ]; then
      //
      // +mkdir -p /home/vagrant/repoFolder/VoColClient
      //
      // cp -r /home/vagrant/VoColClient/Hooks /home/vagrant/repoFolder/VoColClient
      //
      // cd /home/vagrant/repoFolder/VoColClient/Hooks
      //
      // serverURL="${server//\//\\/}"
      //
      // sed -i "s/ServerURL/${serverURL}/g" pre-commit
      //
      // git config user.email "${user}@vocol.com"
      // git config user.name ${user}
      //
      // git add .
      //
      // git commit -m "configuration of repository"
      //
      //  git push "${repository:0:8}${user}:${password}@${repository:8}.git"
      //
      // #GitLab git push https://${user}:${password}@gitlab.com/"${repositoryNamespace}".git master
      //
      // #BitBucket git push https://${user}:${password}@bitbucket.org/"${repositoryNamespace}".git
      //
      // cd /home/vagrant/VoCol
      // fuser -k 3002/tcp
      // node clientServices.js "Rapper" "consistencyChecking" "constraintChecking" "formatting" &
      //
      // fi
      //
      //


      ////////////////////////////////////////////////////////////////////
      //// TurtleEditor
      //////////////////////////////////////////////////////////////////////
      // shell.rm("-rf", "/home/vagrant/schemaorg/docs/TurtleEditor", {
      //   silent: false
      // }).stdout;
      // if (turtleEditor === true && obj.repositoryService === "gitHub") {
      // //   // TODO:schemaorg folder is not exist till now
      // //   shell.cp('-r', '/home/vagrant/VoColClient/TurtleEditor', 'schemaorg/docs/TurtleEditor', {
      // //     silent: false
      // //   }).stdout;
      // //   shell.cd('schemaorg/docs/TurtleEditor', {
      // //     silent: false
      // //   }).stdout;
      // shell.cd('../VoColApp/view/turtleEditor/', {
      //   silent: false
      // }).stdout;
      // shell.exec('pwd', {
      //   silent: false
      // }).stdout;
      //   //var turtleEditorURL = obj.user + "\/" + obj.repositoryName;
      //   // shell.exec('sed -i "s/TurtleEditorURL/' + turtleEditorURL + '/g" github-ttl-editor.html', {
      //   //   silent: false
      //   // }).stdout;
      //   // shell.exec('sed -i "s/TurtleEditorURL/' + turtleEditorURL + '/g" README.md', {
      //   //   silent: false
      //   // }).stdout;
      //   shell.exec('sed -i "s/user_to_replace/' + obj.user + '/g" js/turtle-editor.js', {
      //     silent: false
      //   }).stdout;
      //   shell.exec('sed -i "s/repo_to_replace/' + obj.repositoryName + '/g" js/turtle-editor.js', {
      //     silent: false
      //   }).stdout;
      //
      // }

      // rm -rf /home/vagrant/schemaorg/docs/TurtleEditor
      //turtleEditorURL="${user}\/${repoNameOnly}"
      // if [ "$turtleEditor" == "turtleEditorChecked" ] && [ "$repositoryService" == "GitHub" ]; then
      //turtleEditorURL="${user}\/${repoNameOnly}"
      // #if [ "$turtleEditor" == "turtleEditorChecked" ] ; then
      //
      // cp -r /home/vagrant/VoColClient/TurtleEditor /home/vagrant/schemaorg/docs/TurtleEditor
      //
      // cd /home/vagrant/schemaorg/docs/TurtleEditor
      //
      // turtleEditorURL="${user}\/${repoNameOnly}"
      //
      // sed -i "s/TurtleEditorURL/${turtleEditorURL}/g" github-ttl-editor.html
      //
      // sed -i "s/TurtleEditorURL/${turtleEditorURL}/g" README.md
      //
      // sed -i "s/user_to_replace/${user}/g" js/turtle-editor.js
      //
      // sed -i "s/repo_to_replace/${repoNameOnly}/g" js/turtle-editor.js
      //
      // cp /home/vagrant/VoCol/templates/turtleEditorTemplate.html /home/vagrant/schemaorg/docs/TurtleEditor/turtle-editor.html
      //
      //
      // fi
      //
      //
      //


      ////////////////////////////////////////////////////////////////////
      //// webHook
      //////////////////////////////////////////////////////////////////////
      if (webHook === true) {
      //   shell.echo("");
      //   if (obj.repositoryService === 'gitHub') {
      //     shell.exec('curl -u "' + obj.user + ':' + obj.password + '" -i  https://api.github.com/hub -F "hub.mode=subscribe"  -F "hub.topic=' + obj.repositoryName + '/events/push.json"  -F "hub.callback=' + obj.server + '/push"', {
      //       silent: false
      //     }).stdout;
      //   } else if (obj.repositoryService === 'gitLab') {
      //     shell.exec('git push https://' + obj.user + ':' + obj.password + '@gitlab.com/"' + obj.repositoryName + '".git master', {
      //       silent: false
      //     }).stdout;

          //TODO: for gitLab
          //  #GitLab res=$(curl https://gitlab.com/api/v3/session --data "login=${user}&password=${password}")
          //
          //  #GitLab private_token=""
          //
          //  #GitLab temp=`echo $res | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="private_token" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w private_token`
          //  #GitLab   private_token=${temp##*|}
          //
          //  #GitLab repositoryNamespaceReplaced="${repositoryNamespace/\//%2F}"
          //
          //  #GitLab curl --header "PRIVATE-TOKEN: ${private_token}" -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{ \"id\": \"${repositoryNamespace}\", \"url\": \"${server}/push\", \"push_events\": \"true\"}" https://gitlab.com/api/v3/projects/"${repositoryNamespaceReplaced}"/hooks

        //} else
        if (obj.repositoryService === 'BitBucket') {
          shell.exec('curl -v -H "Content-Type: application/json" -X POST --data "{\"description\": \"VoCol\", \"url\": \"' + obj.server + '/push\", \"active\": true, \"events\": [  \"repo:push\",  \"issue:created\", \"issue:updated\" ] }" https://' + obj.user + ':' + obj.password + '@api.bitbucket.org/2.0/repositories/' + obj.repositoryName + '/hooks', {
            silent: false
          }).stdout;
        }

        //TODO: do we need to run this script again
        // cd /home/vagrant/VoCol
        // fuser -k 3001/tcp
        // node webHookListener.js &


      }
      // if [ "$webHook" == "webHookChecked" ]; then
      //
      //  echo ""
      //
      //   curl -u "${user}:${password}" -i  https://api.github.com/hub -F "hub.mode=subscribe"  -F "hub.topic=${repository}/events/push.json"  -F "hub.callback=${server}/push"
      //
      //  #GitLab res=$(curl https://gitlab.com/api/v3/session --data "login=${user}&password=${password}")
      //
      //  #GitLab private_token=""
      //
      //  #GitLab temp=`echo $res | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="private_token" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w private_token`
      //  #GitLab   private_token=${temp##*|}
      //
      //  #GitLab repositoryNamespaceReplaced="${repositoryNamespace/\//%2F}"
      //
      //  #GitLab curl --header "PRIVATE-TOKEN: ${private_token}" -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{ \"id\": \"${repositoryNamespace}\", \"url\": \"${server}/push\", \"push_events\": \"true\"}" https://gitlab.com/api/v3/projects/"${repositoryNamespaceReplaced}"/hooks
      //
      //  #BitBucket curl -v -H "Content-Type: application/json" -X POST --data "{\"description\": \"VoCol\", \"url\": \"${server}/push\", \"active\": true, \"events\": [  \"repo:push\",  \"issue:created\", \"issue:updated\" ] }" https://${user}:${password}@api.bitbucket.org/2.0/repositories/${repositoryNamespace}/hooks
      //
      // fi
      //
      //
      // cd /home/vagrant/VoCol
      // fuser -k 3001/tcp
      // node webHookListener.js &
      //

      ////////////////////////////////////////////////////////////////////
      //// evolution
      //////////////////////////////////////////////////////////////////////        //  cp /home/vagrant/VoCol/templates/evolutionTemplate.html /home/vagrant/schemaorg/docs/evolution.html
      shell.rm('-f', '/home/vagrant/VoCol/evolution/SingleVoc.ttl', {
        silent: false
      }).stdout;
      shell.exec('echo -n "[]" > schemaorg/docs/data.json', {
        silent: false
      }).stdout;
      if (removeHistory === true) {
        shell.cp('/home/vagrant/VoCol/templates/evolutionTemplate.html', 'schemaorg/docs/evolution.html', {
          silent: false
        }).stdout;
        shell.rm('-f', '/home/vagrant/VoCol/evolution/SingleVoc.ttl', {
          silent: false
        }).stdout;
        shell.exec('echo -n "[]" > schemaorg/docs/data.json', {
          silent: false
        }).stdout;
      }
      //  rm /home/vagrant/VoCol/evolution/SingleVoc.ttl
      //  echo -n "[]" > /home/vagrant/schemaorg/docs/data.json
      //
      //  if [ "$removeHistory" = true ]; then
      //
      //  cp /home/vagrant/VoCol/templates/evolutionTemplate.html /home/vagrant/schemaorg/docs/evolution.html
      //  rm /home/vagrant/VoCol/evolution/SingleVoc.ttl
      //  echo -n "[]" > /home/vagrant/schemaorg/docs/data.json
      //
      //  fi
      //


      //////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////
      /// TODO:we will do this later
      /////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////

      // rm -rf /home/vagrant/schemaorg/docs/otherBranches
      ///*
      //echo -n "[]" > /home/vagrant/schemaorg/docs/otherBranches.json

      //rm -rf /home/vagrant/schemaorg/data/*
      // cp /home/vagrant/VoCol/templates/init.rdfa /home/vagrant/schemaorg/data/init.rdfa
      //
      // cp /home/vagrant/VoCol/templates/schemasTemplate.html /home/vagrant/schemaorg/docs/schemas.html
      // sed -i "s/\$li//g" /home/vagrant/schemaorg/docs/schemas.html
      //
      // rm -f /home/vagrant/schemaorg/docs/webvowl/js/data/SingleVoc.json
      //
      // cd /home/vagrant/fuseki/apache-jena-fuseki-2.3.0/
      // rm run/system/tdb.lock
      // ./fuseki-server --mem /myDataset &
      //
      // rm -rf /home/vagrant/VoCol/serializations/*
      //
      // cd /home/vagrant/VoCol
      // bash mainBranchScript.sh "" master
      //
      // #echo "" > repoConfiguration.sh
      //
      // fuser -k 3000/tcp
      //
      // mv /home/vagrant/schemaorg/docs/configuration_page.html /home/vagrant/VoCol/configuration_page.html




      ///////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////

      //console.log('File repoConfiguration.sh saved.');

      // var execFile = require('child_process').execFile;
      //
      // execFile('../scripts/repoConfiguration.sh', function(error, stdout, stderr) {
      //   console.log( stdout );
      //   console.log( error );
      //   console.log( stderr );
      //
      //   console.log( 'exec complete' );
      // });

      //});
      //TODO: here what is next to do we have the result
      // contents = fs.readFileSync('../templates/configurationResponseTemplate.html', 'utf8');
      // contents = contents.replace(/VocabularyName/g, obj.vocabularyName);
      // contents = contents.replace('response_to_replace', 'Configuration settings received successfully. \n Repository started configuring. Please check it after few moments.\n <a href=\'/docs/configuration_page.html\'>Back</a>');


    });
  }
});
//    res.send(contents);
//
// });
//
// app.listen(3000, function() {
//   console.log('Server running at http://127.0.0.1:3000/');
// });
