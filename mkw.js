/**
 * Created by Useradmin on 2016/9/8.
 */
    window.onload = function(){
        //��¼��
        var denglu = document.getElementById("denglu");
        var background = document.getElementById("click_back");
        var close = document.getElementById("close");
        denglu.onmouseup = function(){
            background.style.display = "block"
        };
        close.onmouseup = function(){
            background.style.display = "none"
        }


        //�ֲ�
        var wrap=document.getElementById("carousel");
        var inner=document.getElementById("inner");
        var spanList=document.getElementById("paganation").getElementsByTagName("span");
        var left=document.getElementById("lun_left");
        var right=document.getElementById("lun_right");
        var clickFlag=true;//���������л����λ��ֹ������,Ч���е㲻ͬ
        var time//��Ҫ���������Զ������ļ�ʱ��
        var index=0;//��¼ÿ�λ���ͼƬ���±�
        var Distance=wrap.offsetWidth;//��ȡչʾ���Ŀ�ȣ���ÿ��ͼƬ�Ŀ��
/*
 * offsetwidth:��Ԫ����Ը�Ԫ�ص�ƫ�ƿ�ȡ�����border+padding+width
 * */

//����ͼƬ�����ĺ���
        function AutoGo(){

            var start=inner.offsetLeft;//��ȡ�ƶ��鵱ǰ��left�Ŀ�ʼ����
            /*
     *   ˢ��ҳ��Ĭ���ǵ�һ��ͼ���ڶ���ͼ����Ҫ�ƶ���
     *   ��ʱ�ڶ���û��������ȡ����startΪ0
     * */

            var end=index*Distance*(-1);//��ȡ�ƶ����ƶ����������ꡣ��ͼƬ���Ƶľ���
            console.log(end);

            //���㹫ʽ�����ƶ���������ͼƬʱ��ͼƬ�±�Ϊ2����ͼƬ�Ŀ�Ⱦ��ǿ��leftֵ��
            var change=end-start;//ƫ����   -510 - 0
            var timer;//�ü�ʱ��ΪͼƬ��Ӷ���Ч��
            var t=0;
            var maxT=30;//���ڼ���ͼƬ��ƫ������ ֵԽ���ƶ���Խ��(����ʱ����ĸ)


            /*
     * �ȰѰ�ť״̬���,���ö�Ӧ��ť�ı�״̬
     * */
            clear();
            if(index==spanList.length){
                spanList[0].className="selected";
            }else{
                spanList[index].className="selected";
            }


            /*clearInterval(timer);*///������ʱ��ǰ�Ȱ�֮ǰ����
            timer=setInterval(function(){
                /* debugger*/
                t++;
                if(t>=maxT){//��ͼƬ�����յ�ֹͣ��ʱ��
                    clearInterval(timer);
                    clickFlag=true;//��ͼƬ�����յ�����л�
                }
                inner.style.left=change/maxT*t+start+"px";//ÿ��17�����ÿ��ƶ�
                if(index==spanList.length&&t>=maxT){
                    inner.style.left=0;
                    index=0; //��ͼƬ�����һ��ʱ����˲���л��ص�һ�ţ����ڶ�ͬһ��ͼƬ����Ӱ��Ч��
                }
            },17);
        }

//����ͼƬ�Զ����һ����ļ�ʱ��
        time=setInterval(forward,10000);


/*
 *   �Զ��ֶ�ͼƬ����
 * */
        function forward(){
            /*  debugger*/
            index++;
            //��ͼƬ�±굽���һ�Ű�С�껻0
            if(index>spanList.length){
                index=0;
            }
            AutoGo();
        }
//ͼƬ���󻬶�����
        function backward(){
            index--;
            //��ͼƬ�±굽��һ���������ص������ڶ��ţ�
            //leftֵҪ�䵽���һ�ŲŲ�Ӱ�����Ч��
            if(index<0){
                index=spanList.length-1;
                inner.style.left=(index+1)*Distance*(-1)+"px";
            }
            AutoGo();
        }




//���������ͣ����ֹͣ
        wrap.onmouseover=function(){
            clearInterval(time);
        }
        wrap.onmouseout=function(){
            time=setInterval(forward,3000);
        }
//����ÿ����ť�����л�����ӦͼƬ
        for(var i=0;i<spanList.length;i++){
            spanList[i].onclick=function(){
                index=this.innerText-1;
                AutoGo();
            }
        }
//���л��¼�
        left.onclick=function(){

            if(clickFlag){
                backward();
            }
            clickFlag=false;
        }
//���л��¼�
        right.onclick=function(){
            if(clickFlag){
                forward();
            }
            clickFlag=false;
        }
//���ҳ�����а�ť״̬��ɫ
        function clear(){
            for(var i=0;i<spanList.length;i++){
                spanList[i].className="";
            }
        }
    }