<script>
	export let name;

    let count = 0;

    function handleClick () {
        count = count + 1;
    }
</script>

<style>
	h1 {
		color: purple;
	}

    b {
        color: red;
    }
</style>

<svelte:head>
    <title>123</title>
</svelte:head>

<div id="app">
    <h1>hello, {name}</h1>

    <button on:click={handleClick}>
        count: {count}
    </button>

    {#if count > 1}
        <b>count > 1</b>
    {/if}
</div>
