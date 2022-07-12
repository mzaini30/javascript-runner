<template>
	<div class="rounded px-4 py-2 inline-block select-none cursor-pointer shadow shadow-black border border-slate-200 hover:shadow-none" @click="$emit('klik')">
		<slot/>
	</div>
</template>
