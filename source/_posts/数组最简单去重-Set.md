---
title: 数组最简单去重-Set
date: 2017-02-10
---
```
<script type='text/javascript'>
	var arr = [1,2,3,3,2,1,3,5,4,11,1,1]
	function newArr(arr){
		return Array.from(new Set(arr))
	}
	alert(newArr(arr))
</script>
```
  