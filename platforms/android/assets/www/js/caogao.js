.controller('graphcontroller', ['$scope', '$http','$ionicSideMenuDelegate','$timeout','$state','$window','$ionicPopover', 'PlanInfo','$ionicLoading', 'Storage',
    function($scope, $http, $ionicSideMenuDelegate,$timeout, $state, $window, $ionicPopover, PlanInfo, $ionicLoading, Storage) {

       //固定变量guide 也可读自json文件
       var SBPGuide='';
       var DBPGuide='';
       SBPGuide=[{"value":"129","toValue":"#CC0000","label":"","lineColor":"#FF5151","lineAlpha":"1","dashLength":"8","color":"#CC0000","fontSize":"8","position":"right","inside":"","fillAlpha":"","fillColor":""},{"value":"110","toValue":"#CC0000","label":"","lineColor":"#CC0000","lineAlpha":"1","dashLength":"4","color":"#CC0000","fontSize":"14","position":"right","inside":"","fillAlpha":"","fillColor":""},{"value":"90","toValue":"120","label":"偏低","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#8080C0"},{"value":"120","toValue":"140","label":"正常","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#00DB00"},{"value":"140","toValue":"160","label":"警戒","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#FFA042"},{"value":"160","toValue":"180","label":"偏高","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#FF60AF"},{"value":"180","toValue":"200","label":"很高","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#FF0000"},{"value":"90","toValue":"#CC0000","label":"90","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"120","toValue":"#CC0000","label":"120","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"140","toValue":"#CC0000","label":"140","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"160","toValue":"#CC0000","label":"160","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"180","toValue":"#CC0000","label":"180","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"200","toValue":"#CC0000","label":"200","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""}];
       DBPGuide=[{"value":"85","toValue":"#CC0000","label":"","lineColor":"#FF5151","lineAlpha":"1","dashLength":"8","color":"#CC0000","fontSize":"8","position":"right","inside":"","fillAlpha":"","fillColor":""},{"value":"70","toValue":"#CC0000","label":"","lineColor":"#CC0000","lineAlpha":"1","dashLength":"4","color":"#CC0000","fontSize":"14","position":"right","inside":"","fillAlpha":"","fillColor":""},{"value":"40","toValue":"60","label":"偏低","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#8080C0"},{"value":"60","toValue":"80","label":"正常","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#00DB00"},{"value":"80","toValue":"100","label":"警戒","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#FFA042"},{"value":"100","toValue":"120","label":"偏高","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#FF60AF"},{"value":"120","toValue":"140","label":"很高","lineColor":"","lineAlpha":"","dashLength":"","color":"#CC0000","fontSize":"14","position":"right","inside":"true","fillAlpha":"0.1","fillColor":"#FF0000"},{"value":"40","toValue":"#CC0000","label":"40","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"60","toValue":"#CC0000","label":"60","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"80","toValue":"#CC0000","label":"80","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"100","toValue":"#CC0000","label":"100","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"120","toValue":"#CC0000","label":"120","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""},{"value":"140","toValue":"#CC0000","label":"140","lineColor":"#CC0000","lineAlpha":"0.15","dashLength":"","color":"#CC0000","fontSize":"8","position":"left","inside":"","fillAlpha":"","fillColor":""}];
       
       $http.get('data/guide-bpm.json').success(function(data) {
         SBPGuide=data;
       });

       $http.get('data/guide-dpm.json').success(function(data) {
         DBPGuide=data;
       });

       //var PulseGuide=  
       var ChartData=""; //图形数据
       var chart="";  //图形对象 全局变量target-phone
      
      
      //初始化
      init_graph();

      $scope.toggleLeftMenu = function() {
          $ionicSideMenuDelegate.toggleLeft();
      };
      
      //弹框初始化
      var template = '<ion-popover-view style="opacity:1"></ion-popover-view>';
      var popover=$ionicPopover.fromTemplate(template);


      //监视进入页面
      $scope.$on('$ionicView.enter', function() {   //$viewContentLoaded
          //console.log("enter graphView") ;
          if(Storage.get('graphRefresh')=='1') //任务完成或插入体征则刷新
          {
            init_graph();
            Storage.set('graphRefresh','0');
          }
          
      });
      
      //提升切换  切换上图Y轴、标题、分级guide
     $scope.changeVitalInfo = function(option) {

         $ionicLoading.show({
          template: '<ion-spinner style="height:2em;width:2em"></ion-spinner>'
         });
         changeDataset(option.SignCode);
         //setTimeout(function(){$ionicLoading.hide();},500);
     };

      //初始化函数
      var init_graph =function()
     {
        $ionicLoading.show({
          template: '<ion-spinner style="height:2em;width:2em"></ion-spinner>'
         });

        //体征下拉框 默认收缩压
        $scope.options = [{"SignName":"收缩压","SignCode":"Bloodpressure|Bloodpressure_1"},{"SignName":"舒张压","SignCode":"Bloodpressure|Bloodpressure_2"},{"SignName":"脉率","SignCode":"Pulserate|Pulserate_1"}];
        $scope.vitalInfo =$scope.options[0];

        //从restful或者jon文件获取数据
        $http.get('data/newphone.json').success(function(data) {
          //ChartData = data;
          createStockChart(data); //画图

          chart.panels[0].valueAxes[0].guides=SBPGuide; //添加分级guide
          chart.validateNow();

          setTimeout(function(){chart.panels[1].addListener("clickGraphItem",showDetailInfo); },1000); //添加点击事件
     }

     //体征切换函数
      var changeDataset = function(ItemCode) {   
        
        var data=''; var path="";
        if(ItemCode=="Bloodpressure|Bloodpressure_1")
        {
          path='data/target-bpm1.json';
        }
        else if(ItemCode=="Bloodpressure|Bloodpressure_2")
        {
          path='data/target-bpm2.json';
        }
        else if(ItemCode=="Pulserate|Pulserate_1")
        {
          path='data/target-pul.json';
        }
        $http.get(path).success(function(data) {

          if((data.GraphList.length>0) && (data.GraphList!=null))          
              {
                //数据格式处理✔ ✘ ' 处理 
                for(var m=0;m<data.GraphList.length;m++)
                {  
                   var regS = new RegExp("noncomplete","g");
                    data.GraphList[m].DrugDescription=data.GraphList[m].DrugDescription.toString().replace(regS, "✘");
                    var regS1 = new RegExp("complete","g");
                    data.GraphList[m].DrugDescription=data.GraphList[m].DrugDescription.toString().replace(regS1, "✔");
                    var regS2 = new RegExp("###","g");
                    data.GraphList[m].DrugDescription=data.GraphList[m].DrugDescription.toString().replace(regS2, "'");
                }
              
                chart="";
                createStockChart(data); //画图
                
                //切换上部图title  guide分级/最大最小值加载data时自动处理
                if((ItemCode=="Bloodpressure|Bloodpressure_1")||(ItemCode=="Bloodpressure|Bloodpressure_2"))
                {
                  chart.panels[0].title="血压 （单位：mmHg）";
                }
                else if(ItemCode=="Pulserate|Pulserate_1")
                {
                  chart.panels[0].title="脉率 （单位：次/分）";
                }
                else
                {
                  chart.panels[0].title="血糖 （单位：次/分）";
                }
                chart.validateNow(); //触发

                //添加点击事件
                //chart.panels[1].addListener("clickGraphItem",showDetailInfo);  
                setTimeout(function(){chart.panels[1].addListener("clickGraphItem",showDetailInfo); $ionicLoading.hide();},1000);

                //有无初始值和目标值，有显示，无则隐藏
                if(((data.GraphGuide.original==null)||(data.GraphGuide.original=="")) && ((data.GraphGuide.target==null)||(data.GraphGuide.target=="")))
                {
                  //$("#ori_tarDiv").css("display","none");
                }
                else
                {
                  //$("#ori_tarDiv").css("display","block");
                  //$("#BPoriginal").text(data.GraphGuide.original);
                  //$("#BPtarget").text(data.GraphGuide.target);
                }
              }
        
           });
          setTimeout(function(){$ionicLoading.hide();},500);
          
        // var promise = PlanInfo.GetSignInfoByCode("U201508100021","M1",20150811,"7");
        // promise.then(function(data) {  
        //     //如果图表数据不为空 
        //     if((data.GraphList.length>0) && (data.GraphList!=null))          
        //     {
        //       //数据格式处理✔ ✘ ' 处理 
        //       for(var m=0;m<data.GraphList.length;m++)
        //       {  
        //          var regS = new RegExp("noncomplete","g");
        //           data.GraphList[m].DrugDescription=data.GraphList[m].DrugDescription.toString().replace(regS, "✘");
        //           var regS1 = new RegExp("complete","g");
        //           data.GraphList[m].DrugDescription=data.GraphList[m].DrugDescription.toString().replace(regS1, "✔");
        //           var regS2 = new RegExp("###","g");
        //           data.GraphList[m].DrugDescription=data.GraphList[m].DrugDescription.toString().replace(regS2, "'");
        //       }
            
        //       chart="";
        //       createStockChart(data); //画图
              
        //       //切换上部图title  guide分级/最大最小值加载data时自动处理
        //       if((ItemCode=="Bloodpressure|Bloodpressure_1")||(ItemCode=="Bloodpressure|Bloodpressure_2"))
        //       {
        //         chart.panels[0].title="血压 （单位：mmHg）";
        //       }
        //       else if(ItemCode=="Pulserate|Pulserate_1")
        //       {
        //         chart.panels[0].title="脉率 （单位：次/分）";
        //       }
        //       else
        //       {
        //         chart.panels[0].title="血糖 （单位：次/分）";
        //       }
        //       chart.validateNow(); //触发

        //       //添加点击事件
        //       chart.panels[1].addListener("clickGraphItem",showDetailInfo);  
              
        //       //有无初始值和目标值，有显示，无则隐藏
        //       if(((data.GraphGuide.original==null)||(data.GraphGuide.original=="")) && ((data.GraphGuide.target==null)||(data.GraphGuide.target=="")))
        //       {
        //         //$("#ori_tarDiv").css("display","none");
        //       }
        //       else
        //       {
        //         //$("#ori_tarDiv").css("display","block");
        //         //$("#BPoriginal").text(data.GraphGuide.original);
        //         //$("#BPtarget").text(data.GraphGuide.target);
        //       }
        //     }
        //   }, function(data) {              
        // });

      } //function end 

      
  function  init_graph()
  {

  //chart={ panels:[ { valueAxes:[ {guides:""} ] } ]};


      $http.get('data/newphone.json').success(function(data) {
        ChartData = data;
        createStockChart(ChartData);

       // $http.get('data/guide.json').success(function(data) {
       //    chart.panels[0].valueAxes[0].guides=data.GuideList;
       //    chart.validateNow();
       //  });

        
        //setTimeout(function(){chart.panels[1].addListener("clickGraphItem",showDetailInfo); },1000);
       
          $ionicLoading.hide();
          
       //var BloodGlucose=
          chart.panels[0].valueAxes[0].guides=SBPGuide;
          chart.validateNow();
      //setTimeout(function(){   },1000);
        //体征切换按钮初始化 可写死
       
      });
      
      //弹框初始化
      var template = '<ion-popover-view style="opacity:1"></ion-popover-view>';
      var popover=$ionicPopover.fromTemplate(template);
 }     
      

     $scope.changeVitalInfo = function(option) {

         $ionicLoading.show({
          template: '<ion-spinner style="height:2em;width:2em"></ion-spinner>'
         });
         changeDataset(option.SignCode);
         //setTimeout(function(){$ionicLoading.hide();},500);
     };

      // //画图函数
      // function createStockChart(ChartData) {
      //   chart=AmCharts.makeChart("chartdiv", {
      //     type: "stock",
      //     pathToImages: "img/amcharts/",
      //     dataDateFormat:"YYYYMMDD",
      //     categoryAxesSettings: {
      //       //minPeriod: "mm"
      //       parseDates: true,
      //       minPeriod:"DD",
      //       dateFormats:[{
      //         period: 'DD',
      //         format: 'MM/DD'
      //       }, {
      //         period: 'WW',
      //         format: 'MM DD'
      //       }, {
      //         period: 'MM',
      //         format: 'MM/DD'
      //       }, {
      //         period: 'YYYY',
      //         format: 'YYYY'
      //       }]
      //     },
      //     dataSets: [{
      //       fieldMappings: [
      //         {fromField: "SignValue",toField: "SignValue"},
      //         {fromField: "DrugValue",toField: "DrugValue"}
      //       ],
      //       //color: "#fac314",
      //       dataProvider: ChartData.GraphList, //数据集   
      //       //title: "体征和任务依从情况",
      //       categoryField: "Date"
      //     }],
      //     valueAxesSettings:{
      //       inside:true,
      //       reversed:false
      //     //labelsEnabled:true        
      //     },  
      //     PanelsSettings:{   
      //      //marginTop:90,
      //      //marginRight:90,
      //      //panelSpacing:400,
      //      // plotAreaBorderAlpha:1,
      //      // plotAreaBorderColor:"#000000"
      //      //usePrefixes: true,
      //     autoMargins:false
      //   },
      //   //autoMargins:false,
      //   panels: [{
      //     title: "血压 （单位：mmHg）",
      //     showCategoryAxis: false,
      //     percentHeight: 65,
      //     autoMargins:false,
      //       //marginTop:300,
      //       //marginLeft:90,
      //       //marginRight:90,
      //       valueAxes: [{
      //         id:"v1",
      //         //strictMinMax:true,
      //         //logarithmic : true,
      //         //baseValue:115,     //起始值，Y线
      //         //dashLength: 5,   //虚线
      //         //title:"血压",
      //         //axisThickness:4,
      //         showFirstLabel:true,
      //         showLastLabel:true,
      //         //inside:false,
      //         gridAlpha : 0,
      //         //labelOffset:0,
      //         labelsEnabled : false,
      //         minimum: ChartData.GraphGuide.minimum,  
      //         maximum: ChartData.GraphGuide.maximum,   
      //                       //显示上下限不对  解决办法parseFloat(guides[0].minimum
      //         guides: ChartData.GraphGuide.GuideList  //区域划分
              
      //       }
      //       //,{id:"v2",minimum:10}
      //       ],
      //       categoryAxis: {
      //         //dashLength: 5 
      //       },
      //       stockGraphs: [{
      //         //type: "line",
      //         id: "graph1",
      //         valueField: "SignValue",
      //         lineColor: "#EA7500",
      //         //lineColorField:"SignColor",
      //         lineThickness : 3,
      //         lineAlpha:1,
      //         //connect:false,
      //         bullet: "round",
      //         bulletField:"SignShape",
      //         bulletSize:12,
      //         //bulletSizeField:"bulletSize",
      //         //customBulletField : "customBullet", //客制化
      //         bulletBorderColor : "#FFFFFF",
      //         bulletBorderThickness : 1,
      //         bulletBorderAlpha : 1,    
      //         showBalloon: true,    
      //         balloonText: "[[SignDescription]]",
      //         ValueAxis:{
      //           id:"v1",
      //           strictMinMax:true,
      //           //maximum: 190,  
      //           //minimum: 65,
      //           }
      //         }],
      //         stockLegend: {     //有这个才能显示title
      //           valueTextRegular: " ",
      //           markerType: "none"
      //           //autoMargins:false
      //         }
      //       },
      //       {
      //         title: "任务依从情况",
      //         showCategoryAxis: true,
      //         //backgroundColor:"#CC0000",
      //         percentHeight: 35,
      //         valueAxes: [{
      //         id:"v2",
      //         gridAlpha : 0,
      //         axisAlpha : 0,
      //         labelsEnabled : false
      //         //minimum: 10,
      //       }],
      //       categoryAxis: {   
      //         //dashLength: 5
      //       },
      //       stockGraphs: [{
      //         //type: "line",
      //         id: "graph2",
      //         valueField: "DrugValue",
      //         lineColor: "#FFFFFF",
      //         lineColorField:"DrugColor",
      //         lineThickness : 0,
      //         lineAlpha:0,
      //         bullet: "round",
      //         bulletSize:20,
      //         //bulletSizeField:"bulletSize",
      //         customBulletField : "DrugBullet", //客制化
      //         bulletBorderColor : "#FFFFFF",
      //         bulletBorderThickness : 2,
      //         bulletBorderAlpha : 1,    
      //         showBalloon: true,    
      //         balloonText: "[[DrugDescription]]",
      //         //labelText:"[[drugDescription]]"
      //         }],
      //         stockLegend: {     //有这个才能显示title
      //           valueTextRegular: " ",
      //           markerType: "none",       
      //         }}
      //     ],
      //     balloon:{
      //        fadeOutDuration:3,   //3秒之后自动消失
      //        animationDuration:0.1,
      //        maxWidth:500,  //必须有，不然自排版是乱的
      //        textAlign:"left",
      //        horizontalPadding:12,
      //        verticalPadding:4,
      //        fillAlpha:0.8
      //     },
      //     chartCursorSettings:{
      //       usePeriod: "7DD",
      //       zoomable:false,
      //       pan:false,
      //       //pan:false,
      //         //zoomable:true,
      //       //leaveCursor:"false",
      //       //cursorPosition:"middle",
      //       categoryBalloonEnabled:false,
      //       categoryBalloonAlpha:1,
      //       categoryBalloonColor:"#ffff",
      //       categoryBalloonDateFormats:[{period:"YYYY", format:"YYYY"}, {period:"MM", format:"YYYY/MM"}, {period:"WW", format:"YYYY/MM/DD"}, {period:"DD", format:"YYYY/MM/DD"}],
      //       valueLineEnabled:false,  //水平线
      //       valueLineBalloonEnabled:false,
      //       valueBalloonsEnabled: true,  //上下值同时显现
      //       //graphBulletSize: 1,
      //     },
      //     chartScrollbarSettings: {  //时间缩放面板
      //       zoomable:false,
      //       pan:true,           
      //       enabled:true,
      //       position: "top",
      //       autoGridCount: true, //默认
      //       graph: "graph1",
      //       graphType:"line",
      //       graphLineAlpha:1,
      //       graphFillAlpha:0,
      //       height:30,
      //       dragIconHeight:28,
      //       dragIconWidth:20,
      //      //usePeriod: "10mm",     
      //     },
      //     responsive: {   //手机屏幕自适应
      //       enabled: true
      //     }
      //      });
      // } //function end 
     
     function createStockChart(ChartData) {
        chart="";
        chart=AmCharts.makeChart("chartdiv", {
          type: "stock",
          pathToImages: "img/amcharts/",
          dataDateFormat:"YYYYMMDD",
          categoryAxesSettings: {
            //minPeriod: "mm"
            parseDates: true,
            minPeriod:"DD",
            dateFormats:[{
              period: 'DD',
              format: 'MM/DD'
            }, {
              period: 'WW',
              format: 'MM DD'
            }, {
              period: 'MM',
              format: 'MM/DD'
            }, {
              period: 'YYYY',
              format: 'YYYY'
            }]
          },
          dataSets: [{
            fieldMappings: [
              {fromField: "SBPValue",toField: "SBPValue"},
              {fromField: "BulletValue",toField: "BulletValue"}],
            //color: "#fac314",
            dataProvider: ChartData.GraphList, //数据集   
            //title: "体征和任务依从情况",
            categoryField: "Date"
          }],
          valueAxesSettings:{
            inside:true,
            reversed:false
          //labelsEnabled:true        
          },  
          PanelsSettings:{   
           //marginTop:90,
           //marginRight:90,
           //panelSpacing:400,
           // plotAreaBorderAlpha:1,
           // plotAreaBorderColor:"#000000"
           //usePrefixes: true,
          autoMargins:false
        },
        //autoMargins:false,
        panels: [{
          title: "血压 （单位：mmHg）",
          showCategoryAxis: false,
          percentHeight: 65,
          autoMargins:false,
            //marginTop:300,
            //marginLeft:90,
            //marginRight:90,
            valueAxes: [{
              id:"v1",
              //strictMinMax:true,
              //logarithmic : true,
              //baseValue:115,     //起始值，Y线
              //dashLength: 5,   //虚线
              //title:"血压",
              //axisThickness:4,
              showFirstLabel:true,
              showLastLabel:true,
              //inside:false,
              gridAlpha : 0,
              //labelOffset:0,
              labelsEnabled : false,
              minimum: 80,  //ChartData.GraphGuide.minimum
              maximum: 200,  //ChartData.GraphGuide.maximum 
                            //显示上下限不对  解决办法parseFloat(guides[0].minimum
              guides:''   //区域划分ChartData.GraphGuide.GuideList
              
            }
            //,{id:"v2",minimum:10}
            ],
            categoryAxis: {
              //dashLength: 5 
            },
            stockGraphs: [{
              //type: "line",
              id: "graph1",
              valueField: "SBPValue",
              lineColor: "#EA7500",
              //lineColorField:"SignColor",
              lineThickness : 3,
              lineAlpha:1,
              //connect:false,
              bullet: "round",
              //bulletField:"SignShape",
              bulletSize:12,
              //bulletSizeField:"bulletSize",
              //customBulletField : "customBullet", //客制化
              bulletBorderColor : "#FFFFFF",
              bulletBorderThickness : 1,
              bulletBorderAlpha : 1,    
              showBalloon: true,    
              balloonText: "血压：[[SBPValue]]/[[DBPValue]] mmHg<br>脉率：[[PulseValue]] 次/分<br>血糖：[[BloodGlucose]] mmol/L",
              ValueAxis:{
                id:"v1",
                strictMinMax:true,
                //maximum: 190,  
                //minimum: 65,
                }
              }],
              stockLegend: {     //有这个才能显示title
                valueTextRegular: " ",
                markerType: "none"
                //autoMargins:false
              }
            },
            {
              title: "任务依从情况",
              showCategoryAxis: true,
              //backgroundColor:"#CC0000",
              percentHeight: 35,
              valueAxes: [{
              id:"v2",
              gridAlpha : 0,
              axisAlpha : 0,
              labelsEnabled : false
              //minimum: 10,
            }],
            categoryAxis: {   
              //dashLength: 5
            },
            stockGraphs: [{
              //type: "line",
              id: "graph2",
              valueField:"BulletValue",
              //lineColor: "#DADADA",
              lineColorField:"BulletColor",
              lineThickness : 0,
              lineAlpha:0,
              bullet: "round",
              bulletSize:20,
              //bulletSizeField:"bulletSize",
              customBulletField : "CustomBullet", //客制化
              bulletBorderColor : "#FFFFFF",
              bulletBorderThickness : 2,
              bulletBorderAlpha : 1,    
              showBalloon: true,    
              balloonText: "[[BulletDescription]]",
              //labelText:"[[drugDescription]]"
              }],
              stockLegend: {     //有这个才能显示title
                valueTextRegular: " ",
                markerType: "none",       
              }}
          ],
          balloon:{
             fadeOutDuration:3,   //3秒之后自动消失
             animationDuration:0.1,
             maxWidth:500,  //必须有，不然自排版是乱的
             textAlign:"left",
             horizontalPadding:12,
             verticalPadding:4,
             fillAlpha:0.8
          },
          chartCursorSettings:{
            usePeriod: "7DD",
            zoomable:false,
            pan:false,
            //pan:false,
              //zoomable:true,
            //leaveCursor:"false",
            //cursorPosition:"middle",
            categoryBalloonEnabled:false,
            categoryBalloonAlpha:1,
            categoryBalloonColor:"#ffff",
            categoryBalloonDateFormats:[{period:"YYYY", format:"YYYY"}, {period:"MM", format:"YYYY/MM"}, {period:"WW", format:"YYYY/MM/DD"}, {period:"DD", format:"YYYY/MM/DD"}],
            valueLineEnabled:false,  //水平线
            valueLineBalloonEnabled:false,
            valueBalloonsEnabled: true,  //上下值同时显现
            //graphBulletSize: 1,
          },
          chartScrollbarSettings: {  //时间缩放面板
            zoomable:false,
            pan:true,           
            enabled:true,
            position: "top",
            autoGridCount: true, //默认
            graph: "graph1",
            graphType:"line",
            graphLineAlpha:1,
            graphFillAlpha:0,
            height:30,
            dragIconHeight:28,
            dragIconWidth:20,
           //usePeriod: "10mm",     
          },
          responsive: {   //手机屏幕自适应
            enabled: true
          }
           });
      } //function end 
     

      //图上点击事件函数
      var showDetailInfo=function(event, scope)
      {
        //获取被点击的bullet的时间值和格式，处理成string"20150618"格式传到webservice
        var dateSelected=event.item.category;
        var theyear=dateSelected.getFullYear();
        var themonth=dateSelected.getMonth()+1;  
        if(themonth<10)
        {
          var themonth="0"+themonth.toString();
        }
        var theday=dateSelected.getDate();
        if(theday<10)
        {
          var theday="0"+theday.toString();
        }
        var theDate=theyear.toString()+themonth.toString()+theday.toString();
 
        console.log(theDate);

        $http.get('data/target-date.json').success(function(data) {
           
           template = '<ion-popover-view style="opacity:1"><ion-header-bar> <h1 class="title">2015-09-13 星期日</h1> </ion-header-bar> <ion-content>'; 
           template +=' <div class="list"><div class="item item-divider">体征测量</div><div class="item">✔血压：160/87mmHg</div><div class="item">✔脉率：67 次/分</div><div class="item item-divider">生活方式</div><div class="item">✘饮食</div><div class="item">✔运动</div></div>';
           template +='</ion-content></ion-popover-view>';

           popover.remove();
           popover=$ionicPopover.fromTemplate(template);
           popover.show();
        });
        
        // var promise = VitalInfo.GetSignsDetailByPeriod("U201508100021","M1",20150811,"7");
        // promise.then(function(data) {  
        //        if(theDate==20151008)
        //        {
        //         template = '<ion-popover-view style="opacity:1"><ion-header-bar> <h1 class="title">My{{aa}}</h1> </ion-header-bar> <ion-content> 1! </ion-content></ion-popover-view>';
        //        }
        //        else if(theDate==20151009)
        //        {
        //         template = '<ion-popover-view style="opacity:1"><ion-header-bar> <h1 class="title">My{{aa}}</h1> </ion-header-bar> <ion-content> 2! </ion-content></ion-popover-view>';
        //        }
        //        popover.remove();
        //        popover=$ionicPopover.fromTemplate(template);
        //        popover.show();
        //        }, function(data) {  // 处理错误 .reject  
              
        // });
      } //function end 

      

      $scope.reload = function() {
         //$state.go("tab.target.graph", {}, { reload: true });    
         //$state.reload();
         $window.location.reload(true);
      };
  }])