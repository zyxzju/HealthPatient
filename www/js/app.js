// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires' 
angular.module('zjubme', ['ionic','zjubme.services', 'zjubme.directives', 'zjubme.controllers','ngCordova','ionic-timepicker','monospaced.qrcode'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// --------路由, url模式设置----------------
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  //注册与登录
  $stateProvider
    .state('signin', {
      cache: false,
      url: '/signin',
      templateUrl: 'partials/login/signin.html',
      controller: 'SignInCtrl'
    })   
    .state('phonevalid', {
      url: '/phonevalid',
      cache: false,
      templateUrl: 'partials/login/phonevalid.html',
      controller: 'phonevalidCtrl'
    })
    .state('setpassword', {
      cache:false,
      url: '/setpassword',
      templateUrl: 'partials/login/setPassword.html',
      controller: 'setPasswordCtrl'
    })
    .state('userdetail',{
      url:'/userdetail',
      templateUrl:'partials/login/userDetail.html',
      controller:'userdetailCtrl'
    });

  //主界面
  $stateProvider
    .state('tab', {
      abstract: true,
      url: '/tab',
      templateUrl: 'partials/tabs/tabs.html',
      controller:'SlidePageCtrl'
    })
     .state('tab.tasklist', {
      url: '/tasklist',
      views: {
        'tab-tasks': {
          templateUrl: 'partials/tabs/index.task.tasklist.html',
         controller: 'tasklistcontroller'
        }
      }
    })
    .state('tab.task',{
      url:"/task",
      abstract:true,
      views:{
        'tab-tasks':{
          template:'<ion-nav-view/>'
        }
      }
    })
   //任务列表跳转
    .state('tab.task.tl',{
      url:"/:tl",
        templateUrl:function($stateParams)
        {
          console.log("$stateParams.tl is "+$stateParams.tl);
          switch($stateParams.tl)
          {
            //case 'tasklist':return "partials/tabs/index.task.tasklist.html";break;
            //case 'healtheducation':return "partials/tabs/index.task.healtheducation.html";break;
            case 'bpm':return "partials/tabs/index.task.bpm.html";break;
             case 'bloodglucose':return "partials/tabs/index.task.bloodglucose.html";break;
            case 'measureweight':return "partials/tabs/index.task.measureweight.html";break;
            default:return "partials/tabs/index.task.taskdetail.html";break;
          }
        },
        controllerProvider:function($stateParams)
        {
          switch($stateParams.tl)
          {
            case 'tasklist':return 'tasklistcontroller';break;
            //case 'healtheducation':return "healtheducationcontroller";break;
            case 'bpm':return "bpmcontroller";break;
            case 'bloodglucose':return "bloodglucosecontroller";break;
            case 'measureweight':return "measureweightcontroller";break;
            default:return 'taskdetailcontroller';break;
          }
        }
    }) 
    .state('tab.targetGraph', {
        url: '/targetGraph',
        views: {
          'tab-target': {
            templateUrl: 'partials/tabs/tab.target.graph.html',
            controller: 'graphcontroller'
          }

        }, onEnter:function(){
         //if(window.localStorage.getItem("ss")=="1"){
          //console.log("a");
          //window.location.reload(true);
         //}

        }
    })
    .state('tab.recordList', {
        url: '/recordList',
        views: {
          'tab-target': {
            templateUrl: 'partials/tabs/tab.target.recordList.html',
            controller: 'recordListcontroller'
          }
        }
    })
.state('tab.chats', {
      url: '/chats',
      abstract: true,
      views:{
        'tab-chats':{
          template:'<ion-nav-view/>'
        }
      }
})
.state('tab.chats.r', {
    url: '/:tt',
    templateUrl: function ($stateParams){

      if($stateParams.tt=='contactList')
      {
        return 'partials/tabs/contactList.html';
        
      }else
      {
        return 'partials/tabs/chat-detail.html';
       
      }      
    },
   controllerProvider: function($stateParams) {
      if($stateParams.tt=='contactList')
      {
        return 'contactListCtrl';
      }else
      {
        return 'ChatDetailCtrl';
      }
  }
  })
    .state('healthCoach', {
      url: '/healthCoach',
      abstract: true,
      template:'<ion-nav-view/>'
    })
    .state('healthCoach.r', {
        url: '/:tt',   
          templateUrl: function ($stateParams){
            if($stateParams.tt=='healthCoachList') return 'partials/healthCoach/healthCoachList.html';
            else if($stateParams.tt=='commentList') return 'partials/healthCoach/commentList.html';
            else if($stateParams.tt=='setComment') return 'partials/healthCoach/setComment.html';
            else return 'partials/healthCoach/healthCoachInfo.html';   
          },
          controllerProvider: function($stateParams) {
            if($stateParams.tt=='healthCoachList') return 'HealthCoachListCtrl';
            else if($stateParams.tt=='commentList') return 'CommentListCtrl';
            else if($stateParams.tt=='setComment') return 'SetCommentCtrl';
            else return 'HealthCoachInfoCtrl';
          }      
  });

//目录
 $stateProvider
    .state('catalog',{
      abstract:true,
      url:"/catalog",
      template:'<ion-nav-view/>',
      controller:'SlidePageCtrl'
    })
    .state('catalog.ct',{
      url:"/:id",
      templateUrl:function($stateParams)
      {
        //console.log("$stateParams. is "+$stateParams.id);
        // return "partials/index.task.measureweight.html";
        return "partials/catalog/catalog."+$stateParams.id+".html";
      },
      controllerProvider:function($stateParams)
      {
        return $stateParams.id + 'controller';
      }
    });

  $urlRouterProvider.otherwise('/signin');
})
// --------不同平台的相关设置----------------
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(3);
  // note that you can also chain configs
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('standard');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.navBar.positionPrimaryButtons('left');
  $ionicConfigProvider.navBar.positionSecondaryButtons('right');
  $ionicConfigProvider.form.checkbox('circle');
});
