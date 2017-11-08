var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var  jsonfile  =  require('jsonfile');
var shell = require('shelljs');
var router = express.Router();
var spawn = require('child_process').spawn;


router.get('/', function(req, res) {

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  shell.exec('pwd').stdout;
  //console.log(process.cwd());
  // check if the userConfigurations file is exist
  // for the first time of app running
  var path = "jsonDataFiles/userConfigurations.json";
  console.log(path);
  fs.exists(path, function(exists) {
    if (exists) {
      jsonfile.readFile(path, function(err, obj)  {
        if (err)
          console.log(err);

        // get out of the root of the VoColApp folder
        shell.cd('..');
        //shell.exec('chmod -R u+x .');

        var clientHooks = (obj.hasOwnProperty('clientHooks')) ? true : false;
        var webHook = (obj.hasOwnProperty('webHook')) ? true : false;
        var turtleEditor = (obj.turtleEditor === "true") ? true : false;
        var removeHistory = false;
        var repositoryURL = obj.repositoryURL;
        repositoryURL = repositoryURL.trim();
        if (repositoryURL [repositoryURL.length - 1] === ('/'))
          repositoryURL = repositoryURL.slice(0, -1);

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
          console.log("loginWithUsernameandPass  " + 'https://' + obj.user + ':' + obj.password + '@' + obj.repositoryURL.slice(8));
          // check if the localRepository same same entered config
          if (localRepository === obj.repositoryURL || localRepository === 'https://' + obj.user + ':' + obj.password + '@' + obj.repositoryURL.slice(8)) {
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
            //shell.exec('git clone "https://' + obj.user + ':' + obj.password + '@' + obj.repositoryURL.slice(8)+'" repoFolder',{silent:false}).stdout;
             shell.exec('git clone "' + repositoryURL + '" repoFolder', {
               silent: false
             }).stdout;
            shell.cd("repoFolder");
            removeHistory = true;
          }
        } else {
          //TODO*:change  the following login
          shell.mkdir("repoFolder");
          //shell.exec('git clone "https://' + obj.user + ':""' + obj.password + '"@' + obj.repositoryURL.slice(8)+'" repoFolder',{silent:false}).stdout;
          //shell.cd("repoFolder");

          shell.exec('git clone "' + repositoryURL + '" repoFolder', {
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


        var repositoryService = obj.repositoryService;
        var repositoryNameParam = obj.repositoryName;
        var branchNameParam = obj.branchName;
        //TODO: which value goes here
        var otherBranchesParam = '#otherBranchesParam';

        //var port = 3001;

        // app.set('port', port);
        // //TODO: enable listening to the port
        // var server = http.createServer(app).listen(port, function() {
        //   console.log('WebHookListener running at http://localhost:' + port);
        // });
        // server.on('request', function(req, res) {
        //     req.setEncoding('utf8');
        //     req.on('data', function(chunk) {
        //         console.log('event received');
        //         try {
        //           var data = JSON.parse(chunk);
        //
        //           console.log(chunk);
        //
        //           var repositoryName = "";
        //           var branchName = "";
        //           var commitMessage = "";
        //
        //           if (repositoryService === 'gitHub') {
        //             repositoryName = data.repository.html_url;
        //             branchName = data.ref.split('/')[2];
        //             commitMessage = data.head_commit.message;
        //           } else if (repositoryService === 'gitLab') {
        //             repositoryName = data.repository.homepage;
        //             branchName = data.ref;
        //             commitMessage = data.commits[0].message;
        //           } else if (repositoryService === 'bitBucket') {
        //             repositoryName = data.repository.links.html.href;
        //             branchName = data.push.changes[0].old.name;
        //             commitMessage = data.push.changes[0].new.target.message;
        //           } else {
        //             repositoryName = repositoryNameParam;
        //             branchName = data.refChanges[0].refId.split('/')[2];
        //             commitMessage = data.changesets.values[0].toCommit.message;
        //           }
        //
        //           if (branchName.includes(branchNameParam) && repositoryNameParam === repositoryName && !commitMessage.includes("merge")) {
        //             console.log('contains');
        //
        //             commitMessage = commitMessage.replace(/\n/g, '');

        // shell.cd('../../repoFolder', {
        //   silent: false
        // }).stdout;
        shell.exec('git checkout ${2}', {
          silent: false
        }).stdout;
        shell.exec('git reset --hard', {
          silent: false
        }).stdout;
        shell.exec('git pull', {
          silent: false
        }).stdout;


        shell.exec('echo -n > ../VoColApp/jsonDataFiles/syntaxErrors.json').stdout;
        var pass = true;
        var data = shell.exec('find . -type f -name \'*.ttl\'', {
          silent: false
        });
        // result of searched file of .ttl
        var files = data.split(/[\n]/);
        var errors = "";
        shell.mkdir('../VoColApp/helper/tools/serializations');

        for (var i = 0; i < files.length - 1; i++) {
          // validation of the turtle files
          var output = shell.exec('ttl ' + files[i] + '', {
            silent: true
          })
          // converting file from turtle to ntriples format
          shell.exec('rapper -i turtle -o ntriples ' + files[i] + ' >> ../VoColApp/helper/tools/serializations/SingleVoc.nt', {
            silent: false
          }).stdout;
          // check if there are syntax errors of turtle format
          if (!output.stdout.includes("0 errors.")) {
            errors += "<h3>Error in file " + files[i] + "</h3><h4>" + output.split('\n')[0] + "</h4><br/>";
            pass = false;
          }
          console.log(files[i]);
        }
        // display syntax errors
        console.log("Errors:\n" + errors);
        if (errors) {
          var filePath = '../VoColApp/jsonDataFiles/syntaxErrors.json';
          fs.writeFileSync(filePath, errors);
          console.log("Errors file is generated\n");
          shell.cd('../VoColApp/');
          shell.exec('pwd').stdout

        }

        //if no syntax errors, then contiune otherwise stop
        if (pass) {
          // converting back to turtle format
          shell.exec('rapper -i ntriples  -o turtle ../VoColApp/helper/tools/serializations/SingleVoc.nt > ../VoColApp/helper/tools/serializations/SingleVoc.ttl', {
            silent: false
          }).stdout;
          // Kill fuseki if it is running
          shell.cd('-p', '../VoColApp/helper/tools/apache-jena-fuseki');
          shell.exec('fuser -k 3030/tcp', {
            silent: false
          }).stdout;
          shell.exec('rm run/system/tdb.lock', {
            silent: false
          }).stdout;
          // show the cuurent path
          shell.exec('pwd');
          // generation the Json files
          shell.cd("../JenaJsonFilesGenrator/").stdout;
          shell.exec('java -jar JenaJsonFilesGenerator.jar').stdout;
          shell.exec('pwd');

          // display visualization part if the user selected it from the configuration page
          if (obj.visualization === "true") {
            shell.exec('pwd');
            shell.cd('../owl2vowl/').stdout;
            shell.exec('java -jar owl2vowl.jar -file ../serializations/SingleVoc.ttl', {
              silent: false
            }).stdout;
            shell.mv('SingleVoc.json', '../../../views/webvowl/js/data/').stdout;
          }

          ////////////////////////////////////////////////////////////////////
          //// TurtleEditor
          //////////////////////////////////////////////////////////////////////
          if (turtleEditor === true && obj.repositoryService === "gitHub") {
            shell.exec('pwd', {
              silent: false
            }).stdout;
            console.log('I am herer sdfdsfdsf sfd sdfdsf dsfd sdf dsfsdf dsfd sfd');
            // filePath where we read from
            var filePath = '../../../views/turtleEditor/js/turtle-editor.js';
            // read contents of the file with the filePath
            var contents = fs.readFileSync(filePath, 'utf8');
            contents = contents.replace(/(owner\.val\(")(.*?)"/mg, "owner.val(\"" + obj.repositoryOwner + "\"");
            contents = contents.replace(/(repo\.val\(")(.*?)"/mg, "repo.val(\"" + obj.repositoryName + "\"");
            // write back to the file with the filePath
            fs.writeFileSync(filePath, contents);
          }

          if(obj.evolutionReport === "true"){
            // Evolution Part
            if (fs.existsSync('../evolution/SingleVoc.ttl')) {
              shell.cd('../owl2vcs/').stdout;
              //  shell.mkdir('../evolution');
              console.log('Insde    hjhhkhlj kjhkh');
              shell.exec('pwd');
              var evolutionReport = shell.exec('./owl2diff ../evolution/SingleVoc.ttl ../serializations/SingleVoc.ttl', {
                silent: false
              }).stdout;
              // write repoter on evolutionReport.txt file
              fs.writeFileSync('../evolution/evolutionReport.txt',evolutionReport,'utf8');
              if (evolutionReport.includes('identical')) {

                var constantString = 'diff SingleVoc.ttl  ../serializations/SingleVoc.ttl';
                console.log(constantString);
              }
              // Do something
            }
            console.log(evolutionReport);
            shell.exec('pwd', {
              silent: false
            }).stdout;
            shell.mkdir('../evolution').stdout;
            shell.cp('../serializations/SingleVoc.ttl', '../evolution/SingleVoc.ttl').stdout;
            console.log('dfgfdgjlkdfjg;kl jddfgdfgfdgdfg fgdfgdfgfdg');
            shell.exec('pwd');
            //
            //evolutionReport = $(. / owl2diff / home / vagrant / VoCol / evolution / SingleVoc.ttl / home / vagrant / repoFolder / SingleVoc.ttl - c 2 > & 1)
            //
            //if echo $evolutionReport | grep - q - v "identical";
            // then
            //
            // # Evolution fileContent = `cat /home/vagrant/schemaorg/docs/evolution.html`
            // #Evolution constant_string = "diff SingleVoc.ttl /home/vagrant/repoFolder/SingleVoc.ttl"#
            // Evolution generationDate = $(date "+%d-%m-%Y %H-%M-%S")# Evolution openTag = "<"#
            // Evolution closeTag = ">"#
            // Evolution openTagHtml = "&lt;"#
            // Evolution closeTagHtml = "&gt;"#
            // Evolution reportDiv = "<div> </div>"#
            // Evolution add = "+ "#
            // Evolution del = "- "#
            // Evolution reportBreakInAddition = "</br>+"#
            // Evolution reportBreakInDeletion = "</br>-"#
            // Evolution evolutionReport = "${evolutionReport//$openTag/$openTagHtml}"#
            // Evolution evolutionReport = "${evolutionReport//$closeTag/$closeTagHtml}"#
            // Evolution evolutionReport = "${evolutionReport/$constant_string/}"#
            // Evolution evolutionReport = "${evolutionReport//$del/$reportBreakInDeletion}"#
            // Evolution evolutionReport = "${evolutionReport//$add/$reportBreakInAddition}"
            //
            // #Evolution uniqueID = $(cat / proc / sys / kernel / random / uuid)
            // # Evolution result_Content = "${fileContent/$reportDiv/$reportDiv</hr></br><div id=\"$uniqueID\">${1}:$generationDate$evolutionReport</div></br>}"
            // #Evolution echo "${result_Content}" > /home/vagrant / schemaorg / docs / evolution.html# Evolution rm / home / vagrant / VoCol / evolution / SingleVoc.ttl
            // # Evolution cd / home / vagrant / VoCol
            // # Evolution node helper.js $uniqueID "\"${1}\""
            // # Evolution fi# Evolution fi
            //
            // # Evolution cp / home / vagrant / repoFolder / SingleVoc.ttl / home / vagrant / VoCol / evolution / SingleVoc.ttl


            // shell.rm('-f', '/home/vagrant/VoCol/evolution/SingleVoc.ttl', {
            //   silent: false
            // }).stdout;
            // shell.exec('echo -n "[]" > schemaorg/docs/data.json', {
            //   silent: false
            // }).stdout;
            // if (removeHistory === true) {
            //   shell.cp('/home/vagrant/VoCol/templates/evolutionTemplate.html', 'schemaorg/docs/evolution.html', {
            //     silent: false
            //   }).stdout;
            //   shell.rm('-f', '/home/vagrant/VoCol/evolution/SingleVoc.ttl', {
            //     silent: false
            //   }).stdout;
            //   shell.exec('echo -n "[]" > schemaorg/docs/data.json', {
            //     silent: false
            //   }).stdout;
            // }
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
        }

          ////////////////////////////////////////////////////////////////////
          // client hooks
          ////////////////////////////////////////////////////////////////////
          //TODO: just disable for testing perpose
          // if (obj.clientHooks === "true") {
          //   shell.exec("pwd"); // in repoFolder path
          //
          //   shell.cd("../repoFolder"); // in repoFolder path
          //   //shell.mkdir('-p', 'VoColClient');
          //   shell.cp('-r', '../VoColApp/helper/tools/VoColClient/Hooks', 'VoColClient/');
          //   shell.cd('-p', 'VoColClient/Hooks');
          //   //TODO:
          //   var serverURL = "${" + obj.server + "//\//\\/}"
          //   //
          //   shell.sed('-i', "s/ServerURL/" + serverURL + "/g" + ' pre-commit', {
          //     silent: false
          //   }).stdout;
          //   shell.exec('pwd');
          //   shell.cd("../../repoFolder"); // in repoFolder path
          //   shell.exec('git config user.email "' + obj.user + '@vocol.com"', {
          //     silent: false
          //   }).stdout;
          //   shell.exec('git config user.name ' + obj.user, {
          //     silent: false
          //   }).stdout;
          //   shell.exec('git add .', {
          //     silent: false
          //   }).stdout;
          //   shell.exec('git commit -m "configuration of repository"', {
          //     silent: false
          //   }).stdout;
          //   //TODO*:change  the following login
          //   //shell.exec('git clone "${repository:0:8}${user}:${password}@${repository:8}.git" repoFolder',{silent:false}).stdout;
          //   if (obj.repositoryService === 'gitHub')
          //     shell.exec('git push "https://' + obj.user + ':' + obj.password + '@' + obj.repositoryURL.slice(8) + '"  repoFolder', {
          //       silent: false
          //     }).stdout;
          //   else if (obj.repositoryService === 'gitLab')
          //     shell.exec('git push https://' + obj.user + ':' + obj.password + '@gitlab.com/"' + obj.repositoryName + '".git master', {
          //       silent: false
          //     }).stdout;
          //   else if (obj.repositoryService === 'BitBucket')
          //     shell.exec('git push https://' + obj.user + ':' + obj.password + '@bitbucket.org/"' + obj.repositoryName + '".git', {
          //       silent: false
          //     }).stdout;
          //   // #GitLab git push https://${user}:${password}@gitlab.com/"${repositoryNamespace}".git master
          //
          //   //  git push "${repository:0:8}${user}:${password}@${repository:8}.git"
          //   //
          //   //
          //   // #BitBucket git push https://${user}:${password}@bitbucket.org/"${repositoryNamespace}".git
          //   //
          //   shell.cd('../..'); //VoColClient
          //   //TODO*: do we need to do  the below commands
          //   // fuser -k 3002/tcp
          //   // node clientServices.js "Rapper" "consistencyChecking" "constraintChecking" "formatting" &
          // }

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

          ////////////////////////////////////////////////////////////////////
          //// webHook
          // //////////////////////////////////////////////////////////////////////
          // if (webHook === true) {
          //   //   shell.echo("");
          //   //   if (obj.repositoryService === 'gitHub') {
          //   //     shell.exec('curl -u "' + obj.user + ':' + obj.password + '" -i  https://api.github.com/hub -F "hub.mode=subscribe"  -F "hub.topic=' + obj.repositoryName + '/events/push.json"  -F "hub.callback=' + obj.server + '/push"', {
          //   //       silent: false
          //   //     }).stdout;
          //   //   } else if (obj.repositoryService === 'gitLab') {
          //   //     shell.exec('git push https://' + obj.user + ':' + obj.password + '@gitlab.com/"' + obj.repositoryName + '".git master', {
          //   //       silent: false
          //   //     }).stdout;
          //
          //   //TODO: for gitLab
          //   //  #GitLab res=$(curl https://gitlab.com/api/v3/session --data "login=${user}&password=${password}")
          //   //
          //   //  #GitLab private_token=""
          //   //
          //   //  #GitLab temp=`echo $res | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="private_token" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w private_token`
          //   //  #GitLab   private_token=${temp##*|}
          //   //
          //   //  #GitLab repositoryNamespaceReplaced="${repositoryNamespace/\//%2F}"
          //   //
          //   //  #GitLab curl --header "PRIVATE-TOKEN: ${private_token}" -H "Accept: application/json" -H "Content-type: application/json" -X POST -d "{ \"id\": \"${repositoryNamespace}\", \"url\": \"${server}/push\", \"push_events\": \"true\"}" https://gitlab.com/api/v3/projects/"${repositoryNamespaceReplaced}"/hooks
          //
          //   //} else
          //   // if (obj.repositoryService === 'BitBucket') {
          //   //   shell.exec('curl -v -H "Content-Type: application/json" -X POST --data "{\"description\": \"VoCol\", \"url\": \"' + obj.server + '/push\", \"active\": true, \"events\": [  \"repo:push\",  \"issue:created\", \"issue:updated\" ] }" https://' + obj.user + ':' + obj.password + '@api.bitbucket.org/2.0/repositories/' + obj.repositoryName + '/hooks', {
          //   //     silent: false
          //   //   }).stdout;
          //   // }
          //
          //   //TODO: do we need to run this script again
          //   // cd /home/vagrant/VoCol
          //   // fuser -k 3001/tcp
          //   // node webHookListener.js &
          //
          //
          // }
          // run external bash script to start up both fuseki-server and VoColApp
          const child = spawn('sh', ['../../scripts/run.sh', '&']);
          // show output live of process on std
          child.stdout.pipe(process.stdout);
          shell.exec('pwd');
          shell.cd('../../../.').stdout;
          // redirect to the start page
          res.redirect('/');
        }
        else // if it has syntaxErrors
        {
          shell.exec('pwd');
          shell.cd('../VoColApp/').stdout;
          res.redirect('/validation');
        }
        //       }
        //
        //       } catch (e) {
        //         console.log("error:");
        //         console.log(e);
        //       }
        //     });
        // });
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
        // shell.rm('-f', '/home/vagrant/VoCol/evolution/SingleVoc.ttl', {
        //   silent: false
        // }).stdout;
        // shell.exec('echo -n "[]" > schemaorg/docs/data.json', {
        //   silent: false
        // }).stdout;
        // if (removeHistory === true) {
        //   shell.cp('/home/vagrant/VoCol/templates/evolutionTemplate.html', 'schemaorg/docs/evolution.html', {
        //     silent: false
        //   }).stdout;
        //   shell.rm('-f', '/home/vagrant/VoCol/evolution/SingleVoc.ttl', {
        //     silent: false
        //   }).stdout;
        //   shell.exec('echo -n "[]" > schemaorg/docs/data.json', {
        //     silent: false
        //   }).stdout;
        // }
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




      });
    }
    else {
      res.redirect('/config');
    }
  });
});

module.exports = router;
