$(function(){
	var rid="";
	/*
	 * To obtain random rid
	 */
	getIdforradom=function(){
		var myDate=new Date();
		rid="1"+myDate.getSeconds().toString()+myDate.getMilliseconds().toString();
	},
	/*
	 * Delete Page elements According to rid 
	 */
	delParamPChild=function(rid){
		$('#add'+rid).remove();
	},
	/*
	 * Get Goods Type for select elements
	 */
	findGoodsTypeTNForSelect=function(){
		$.ajax({
			url:"findGoodsTypeTNForSelect.action",
			type:"post",
			dataType:'json',
			async:false,
			success:function(data){
			if(data.goodstypetnlist!=""){
				$('#goodstypetn').append(data.goodstypetnlist);
				}
			}
		});
	},
	/**
	 * 根据商品类型绑定属性并显示
	 */
	findGoodsAttributeTByGoodsTypeName=function(goodsTypeName){
		//这里需要绑定商品类型。有待商榷
		$.ajax({
			url:"findGoodsAttributeTByGoodsTypeName.action",
			type:"post",
			data:{"goodsTypeName":goodsTypeName},
			dataType:'json',
			async:false,
			success:function(data){
				if(data.beanlist.length>0){
					var html="";
					var rid="";
					$.each(data.beanlist,function(n,value){
						if(value.attributeType=="1"){
							rid=value.goodsattributeid;
							html+="<tr id='add"+rid+"'>" +
							"<td class='title'><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='attribute' id='paramlistname"+rid+"' name='paramlistname"+rid+"' value='"+value.goodsattributename+"'/></div></div></div></div></td>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><select class='attribute' id='attributetype"+rid+"' name='attributetype"+rid+"'><option value='0'>筛选项</option></select></div></div></div></div></td>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='medium' id='attributelists"+rid+"' name='attributelists"+rid+"' value='"+value.attributelist+"'></input></div></div></div></div></td>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='small' id='paramlistsort"+rid+"' name='paramlistsort"+rid+"' value='"+value.sort+"'/></div></div></div></div></td>"+
							"<input type='hidden' class='attribute' id='paramattributeid' name='paramattributeid' value='"+value.goodsattributeid+"'></input>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input  class='btn btn-success' id='delbutton"+rid+"' name='delbutton"+rid+"' type='button' value='删除' onClick='delParamPChild("+rid+")' style='display:'';' /></div></div></div></div></td>"+
							"</tr>";
						}else{
							rid=value.goodsattributeid;
							html+="<tr id='add"+rid+"'>" +
							"<td class='title'><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='attribute' id='paramlistname"+rid+"' name='paramlistname"+rid+"' value='"+value.goodsattributename+"'/></div></div></div></div></td>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><select class='attribute' id='attributetype"+rid+"' name='attributetype"+rid+"'><option value='0' selected>筛选项</option></select></div></div></div></div></td>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='attribute' id='attributelists"+rid+"' name='attributelists"+rid+"' value='"+value.attributelist+"'></input></div></div></div></div></td>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='small' id='paramlistsort"+rid+"' name='paramlistsort"+rid+"' value='"+value.sort+"'/></div></div></div></div></td>"+
							"<input type='hidden' class='attribute' id='paramattributeid' name='paramattributeid' value='"+value.goodsattributeid+"'></input>"+
							"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input  class='btn btn-success' id='delbutton"+rid+"' name='delbutton"+rid+"' type='button' value='删除' onClick='delParamPChild("+rid+")' style='display:'';' /></div></div></div></div></td>"+
							"</tr>";
						}
					});
					var gtid=data.beanlist[0].goodsTypeId;
					$('#goodstypetn').val(gtid);
					$('.table tbody').empty().append(html);
				}
			}
		});
		//显示修改按钮
		$('#updateattrs').show();
		//隐藏增加按钮
		$('#submitattrs').hide();
	},
	/**
	 * 选择商品类型后加载已经有的属性
	 */
	$('#goodstypetn').change(function(){
		var goodsTypeName=$('#goodstypetn').find("option:selected").text();
		//这里需要先读取商品类型下已经有的属性并注入到页面中
		findGoodsAttributeTByGoodsTypeName(goodsTypeName);
	});
	/**
	 * 增加属性列表
	 */
	$('#addattrs').click(function(){
		var goodstypetn=$('#goodstypetn').val();
		if(goodstypetn=="0"){
			formwarning("#alerterror","请选择商品类型");
			return false;
		}
		getIdforradom();
		var html="<tr id='add"+rid+"'>" +
				"<td class='title'><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='attribute' id='paramlistname"+rid+"' name='paramlistname"+rid+"' type='text'/></div></div></div></div></td>"+
				"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><select class='attribute' id='attributetype"+rid+"' name='attributetype"+rid+"'><option value='0'>筛选项</option></select></div></div></div></div></td>"+
				"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='attribute' id='attributelists"+rid+"' name='attributelists"+rid+"'  type='text'></input></div></div></div></div></td>"+
				"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input class='small' id='paramlistsort"+rid+"' name='paramlistsort"+rid+"' type='text' /></div></div></div></div></td>"+
				"<td><div class='form'><div class='fields'><div class='field field-first'><div class='typeinput'><input  class='btn btn-success' id='delbutton"+rid+"' name='delbutton"+rid+"' type='button' value='删除' onClick='delParamPChild("+rid+")'/></div></div></div></div></td>"+
				"</tr>";
		$('.table tbody').append(html);
	});
	/**
	 * 提交属性
	 */
	$('#submitattrs').click(function(){
		var goodstypetn=$('#goodstypetn').val();
		if(goodstypetn=="0"){
			formwarning("#alerterror","请选择商品类型");
			return false;
		}
		var goodsTypeId=$('#goodstypetn').val();
		var goodsTypeName=$('#goodstypetn').find("option:selected").text();
		var paramlistname="paramlistname";
		var attributetype="attributetype";
		var attributelists="attributelists";
		var paramlistsort="paramlistsort";
		var delbutton="delbutton";
		var goodsattributename;
		var attributeType;
		var attributelist;
		var sort;
		var attributeIndex=1;
		var addflag=0;
		var sucflag=false;
		var sub="";
		var rjson="";
		$(".attribute").each(function(){
			if(this.name.substring(0,13)==paramlistname){
				if(this.value==""){
					jAlert('商品属性名称必须填写', '信息提示');
					sucflag=false;
					return false;
				}else{
					var str = this.value;
					var reg = /[\-\[\{\}\]:"]+/;
				
					if((result = reg.exec(str)) !=null){
						jAlert('商品属性名称有非法字符"[","]","{","}",":","-"', '信息提示');
						sucflag=false;
						return false;
					}
				}
				goodsattributename=this.value;
				addflag=1;
				return true;
			}
			if(this.name.substring(0,13)==attributetype){
				if(this.value==""){
					jAlert('商品类型必须选择', '信息提示');
					sucflag=false;
					return false;
				}
				attributeType=this.value;
				addflag=2;
				return true;
			}
			if(this.name.substring(0,14)==attributelists){
				if(this.value==""){
					jAlert('商品可选项必须填写', '信息提示');
					sucflag=false;
					return false;
				}else {
					var str = this.value;
					var reg = /[\-\[\{\}\]:"]+/;
					var result;
					if((result = reg.exec(str)) !=null){
						jAlert('商品可选项有非法字符"[","]","{","}",":","-"', '信息提示');
						sucflag=false;
						return false;
					}
				}
				attributelist=this.value;
				addflag=3;
				return true;
			}
			if(this.name.substring(0,13)==paramlistsort){
				if(this.value==""){
					jAlert('商品属性排序必须填写', '信息提示');
					sucflag=false;
					return false;
				}else{
					var str = this.value;
					var reg = /\D/;
					var result;
					if((result = reg.exec(str)) !=null){
						jAlert('商品属性排序只能数字', '信息提示');
						sucflag=false;
						return false;
					}
				}
				sort=this.value;
				addflag=4;
				return true;
			}
			if(this.name.substring(0,9)==delbutton){
				if(addflag==4){
					sub+="{\"goodsattributename\":\""+goodsattributename+"\",\"attributeType\":\""+attributeType+"\",\"attributelist\":\""+attributelist+"\",\"sort\":\""+sort+"\"}-";
					addflag=0;
					goodsattributename="";
					attributeType="";
					attributelist="";
					sort="";
					sucflag=true;
				}
			}
		});
		rjson=sub.toString().substring(0, sub.length-1);
		this.disabled=true;
		if(sucflag==true){
			//插入商品属性数据
			//"goodsattributename":goodsattributename,"goodsTypeId":goodsTypeId,"goodsTypeName":goodsTypeName,"attributeType":attributeType,"attributelist":attributelist,"sort":sort,"attributeIndex":attributeIndex
			$.post("addGoodsAttributeT.action",{"rjson":rjson,"goodsTypeId":goodsTypeId,"goodsTypeName":goodsTypeName,"attributeIndex":attributeIndex},function(data){
				if(data.sucflag){
					sucflag=true;
					window.location.href="goodsattributement.jsp?operate=find&folder=goods";
				}else{
					this.disabled="";
					sucflag=false;
				}
			});
		}else{
			this.disabled="";
			return false;
		}
	});
	
	$('#updateattrs').click(function(){
		this.disabled="true";
		var goodstypetn=$('#goodstypetn').val();
		if(goodstypetn=="0"){
			jAlert('商品类型必须选择', '信息提示');
			return false;
		}
		var goodsTypeId=$('#goodstypetn').val();
		var goodsTypeName=$('#goodstypetn').find("option:selected").text();
		var paramlistname="paramlistname";
		var attributetype="attributetype";
		var attributelists="attributelists";
		var paramlistsort="paramlistsort";
		var paramattributeid="paramattributeid";
		var delbutton="delbutton";
		var goodsattributename;
		var attributeType;
		var attributelist;
		var goodsattributeid;
		var sort;
		var attributeIndex=1;
		var addflag=0;
		var sucflag=true;
		var sub="";
		var rjson="";
		var formcheck;
		$(".attribute").each(function(){
			if(this.name.substring(0,13)==paramlistname){
				if(this.value==""){
					jAlert('商品属性名称必须填写', '信息提示');
					sucflag=false;
					return false;
				}else{
					var str = this.value;
					var reg = /[\-\[\{\}\]:"]+/;
					var result;
					if((result = reg.exec(str)) !=null){
						jAlert('商品属性名称有非法字符"[","]","{","}",":","-"', '信息提示');
						sucflag=false;
						return false;
					}
				}
				goodsattributename=this.value;
				addflag=1;
			}
			if(this.name.substring(0,13)==attributetype){
				if(this.value==""){
					jAlert('商品类型必须选择', '信息提示');
					sucflag=false;
					return false;
				}
				attributeType=this.value;
				addflag=2;
			}
			if(this.name.substring(0,14)==attributelists){
				if(this.value==""){
					jAlert('商品可选项必须填写', '信息提示');
					sucflag=false;
					return false;
				}else {
					var str = this.value;
					var reg = /[\-\[\{\}\]:"]+/;
					var result;
					if((result = reg.exec(str)) !=null){
						jAlert('商品可选项有非法字符"[","]","{","}",":","-"', '信息提示');
						sucflag=false;
						return false;
					}
				}
				attributelist=this.value;
				addflag=3;
			}
			if(this.name.substring(0,13)==paramlistsort){
				if(this.value==""){
					jAlert('商品属性排序必须填写', '信息提示');
					sucflag=false;
					return false;
				}else{
					var str = this.value;
					var reg = /\D/;
					var result;
					if((result = reg.exec(str)) !=null){
						jAlert('商品属性排序只能是数字', '信息提示');
						sucflag=false;
						return false;
					}
				}
				sort=this.value;
				addflag=4;
			}
			if(this.name.substring(0,16)==paramattributeid){
				if(this.value==""){
					jAlert('商品属性ID异常', '信息提示');
					sucflag=false;
					return false;
				}
				goodsattributeid=this.value;
				addflag=5;
			}
			if(this.name.substring(0,9)==delbutton){
				if(addflag==5){
					sub+="{\"goodsattributename\":\""+goodsattributename+"\",\"attributeType\":\""+attributeType+"\",\"attributelist\":\""+attributelist+"\",\"sort\":\""+sort+"\",\"goodsattributeid\":\""+goodsattributeid+"\"}-";
					addflag=0;
					goodsattributename="";
					attributeType="";
					attributelist="";
					goodsattributeid="";
					sort="";
					sucflag=true;
				}
			}
		});
		
		if(sucflag==true){
			rjson=sub.toString().substring(0, sub.length-1);
			$.post("UpdateGoodsAttributeT.action",{"rjson":rjson,"goodsTypeId":goodsTypeId,"goodsTypeName":goodsTypeName,"attributeIndex":attributeIndex},function(data){
				if(data.sucflag){
					sucflag=true;
					window.location.href="goodsattributement.jsp?operate=find&folder=goods";
				}else{
					sucflag=false;
					this.disabled="";
				}
			});
		}else{
			this.disabled="";
			return false;
		}
		
	});
	
});
/*===========================================Gorgeous split-line==============================================*/
$(function(){
	var operate = $.query.get("operate");
	if (operate == "add") {
		findGoodsTypeTNForSelect();
		return;
	}else if(operate=="edit"){
		findGoodsTypeTNForSelect();
		var goodsTypeName=$.query.get('goodsTypeName');
		if(goodsTypeName==""){
			return false;
		}else{
			findGoodsAttributeTByGoodsTypeName(goodsTypeName);
			return;
		}
		
	}
});
/*===========================================Gorgeous split-line==============================================*/

/**
 * flexigrid list 
 */
$(function() {
	$("#goodsattributenmanagement").flexigrid( {
		url : 'findAllGoodsAttributeT.action',
		dataType : 'json',
		cache : false,
		colModel : [{ 
			display:'属性名称',
			name:'goodsattributename',
			width:315,
			sortable:true,
			align:'center'
		},{ 
			display:'属性类型',
			name:'attributeType',
			width:115,
			sortable:true,
			align:'center'
		},{ 
			display:'属性列表',
			name:'attributelist',
			width:415,
			sortable:true,
			align:'center'
		},{ 
			display:'排序',
			name:'sort',
			width:115,
			sortable:true,
			align:'center'
		},{ 
			display:'商品类型',
			name:'goodsTypeName',
			width:215,
			sortable:true,
			align:'center'
		},{ 
			display:'检索',
			name:'issearch',
			width:115,
			sortable:true,
			align:'center'
		},{ 
			display:'关联',
			name:'issametolink',
			width:115,
			sortable:true,
			align:'center'
		},{ display:'创建时间',
			name:'createtime',
			width:300,
			sortable:true,
			align:'center'
		}, {
			display : '操作',
			name : 'operate',
			width : 100,
			sortable : true,
			align : 'center'
		}],
		buttons : [ {
			name : '添加',
			bclass : 'add',
			onpress : action
		}, {
			name : '编辑',
			bclass : 'edit',
			onpress : action
		},{
			name:'删除',
			bclass:'del',
			onpress:action
		},{
			name:'启用检索支持',
			bclass:'edit',
			onpress:action
		},{
			name:'禁用检索支持',
			bclass:'edit',
			onpress:action
		},{
			name:'启用关联搜索',
			bclass:'edit',
			onpress:action
		},{
			name:'禁用关联搜索',
			bclass:'edit',
			onpress:action
		},{
			separator : true
		}],
		searchitems : [{
			display:'请选择搜索条件',
			name:'sc',
			isdefault : true
		}],
		sortname : "createtime",
		sortorder : "desc",
		usepager : true,
		title : '',
		useRp : true,
		rp : 20,
		rpOptions : [ 5, 20, 40, 100 ],
		showTableToggleBtn : true,
		width :'auto',
		height :'auto',
		pagestat : '显示{from}到{to}条，共{total}条记录',
		procmsg : '正在获取数据，请稍候...',
		checkbox:true
	});
	function action(com, grid) {
		if (com == '添加') {
			window.location.href="goodsattribute.jsp?operate=add&folder=goods";
			return;
		}else if(com=='编辑'){
			if($('.trSelected',grid).length==1){
				var str="";
				$(".trSelected td:nth-child(6) div", $('#goodsattributenmanagement')).each(function(i){
					str=this.innerHTML;
				});
				window.location.href="goodsattribute.jsp?operate=edit&folder=goods&goodsTypeName="+str;
				return;
			}else{
				formwarning("#alerterror", "请选择一条信息");
				return false;
			}
		}else if(com=='删除'){
			if($('.trSelected',grid).length>0){
				var str="";
				$('.trSelected',grid).each(function(){
					str+=this.id.substr(3)+",";
				});
				$.post("delGoodsAttributeT.action",{"goodsattributeid":str},function(data){
					$('#goodsattributenmanagement').flexReload();
					forminfo("#alertinfo","删除商品属性成功");
				});
				return;
			}else{
				formwarning("#alerterror", "请选择要删除的信息");
				return false;
			}
		}else if(com=='启用检索支持'){
			if($('.trSelected',grid).length>0){
				var str="";
				var issearch="1";
				$('.trSelected',grid).each(function(){
					str+=this.id.substr(3)+",";
				});
				$.post("updateGoodsAttributeissearchBygoodsattributeid.action",{"goodsattributeid":str,"issearch":issearch},function(data){
					$('#goodsattributenmanagement').flexReload();
					forminfo("#alertinfo","启用检索支持成功");
				});
				return;
			}else{
				formwarning("#alerterror", "请选择要启用检索支持的信息");
				return false;
			}
		}else if(com=='禁用检索支持'){
			if($('.trSelected',grid).length>0){
				var str="";
				var issearch="0";
				$('.trSelected',grid).each(function(){
					str+=this.id.substr(3)+",";
				});
				$.post("updateGoodsAttributeissearchBygoodsattributeid.action",{"goodsattributeid":str,"issearch":issearch},function(data){
					$('#goodsattributenmanagement').flexReload();
					forminfo("#alertinfo","禁用检索支持成功");
				});
				return;
			}else{
				formwarning("#alerterror", "请选择要禁用检索支持的信息");
				return false;
			}
		}else if(com=='启用关联搜索'){
			if($('.trSelected',grid).length>0){
				var str="";
				var issametolink="1";
				$('.trSelected',grid).each(function(){
					str+=this.id.substr(3)+",";
				});
				$.post("updateGoodsAttributeissearchBygoodsattributeid.action",{"goodsattributeid":str,"issametolink":issametolink},function(data){
					$('#goodsattributenmanagement').flexReload();
					forminfo("#alertinfo","启用关联搜索成功");
				});
				return;
			}else{
				formwarning("#alerterror", "请选择要启用关联搜索的信息");
				return false;
			}
		}else if(com=='禁用关联搜索'){
			if($('.trSelected',grid).length>0){
				var str="";
				var issametolink="0";
				$('.trSelected',grid).each(function(){
					str+=this.id.substr(3)+",";
				});
				$.post("updateGoodsAttributeissearchBygoodsattributeid.action",{"goodsattributeid":str,"issametolink":issametolink},function(data){
					$('#goodsattributenmanagement').flexReload();
					forminfo("#alertinfo","禁用关联搜索成功");
				});
				return;
			}else{
				formwarning("#alerterror", "请选择要禁用关联搜索的信息");
				return false;
			}
		}
	}
});
/*===========================================Gorgeous split-line==============================================*/
