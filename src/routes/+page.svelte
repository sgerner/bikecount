<script>
	import { tripsQueued, tripsProcessed } from '$lib/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	let name = '';
	let email = '';
	let location = 'a';
	let quantity = 1;
	let direction = 'North';
	let wrongway = false;
	let sidewalk = false;
	let helmet = true;
	let female = false;

	// Function to handle form submission
	function handleSubmit() {
		const timestamp = new Date().toISOString();
		tripsQueued.update((items) => [
			...items,
			{ name, email, quantity, direction, wrongway, sidewalk, helmet, female, timestamp }
		]);
		quantity = 1;
		wrongway = false;
		sidewalk = false;
		female = false;
	}

	// Function to convert timestamp to human readable string
	function formatIsoTimestampToCustomString(isoTimestamp) {
		const date = new Date(isoTimestamp);

		// Construct the formatted string
		const options = {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		};
		let formattedString = date.toLocaleString('en-US', options);

		return formattedString;
	}
</script>

<div class="text-center flex flex-col items-center my-6">
	<h2 class="h2">Count Bicyclists!</h2>
</div>
<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div class="card flex flex-wrap gap-4 p-6 text-token max-w-3xl m-auto justify-between">
		<input
			type="text"
			bind:value={name}
			placeholder="Your Name"
			class="input w-full max-w-xs"
			required
		/>
		<input
			type="email"
			bind:value={email}
			placeholder="Your Email"
			class="input w-full max-w-xs"
			required
		/>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim">Location:</div>
			<select bind:value={location} required>
				<option value="1">University & Rural</option>
				<option value="2">University & College</option>
				<option value="3">Terrace & Rural</option>
				<option value="4">Lemon & Rural</option>
			</select>
		</div>
	</div>
	<div class="card flex flex-wrap gap-4 p-6 text-token max-w-3xl m-auto justify-center">
		<div
			class="input-group input-group-divider grid-cols-[auto_1fr_auto] max-w-fit flex flex-nowrap"
		>
			<div class="input-group-shim"># of Cyclists:</div>
			<button
				type="button"
				class="btn btn-sm bg-initial"
				on:click={() => (quantity > 1 ? (quantity -= 1) : null)}>-</button
			>
			<input
				type="text"
				min="1"
				bind:value={quantity}
				required
				class="w-6"
				on:input={(event) =>
					Number.isInteger(parseInt(event.target.value))
						? (quantity = parseInt(event.target.value))
						: null}
			/>
			<button type="button" class="btn btn-sm bg-initial" on:click={() => (quantity += 1)}>+</button
			>
		</div>
		<RadioGroup class="min-w-full flex flex-wrap">
			<RadioItem bind:group={direction} name="north" value={'North'}>Going North</RadioItem>
			<RadioItem bind:group={direction} name="south" value={'South'}>Going South</RadioItem>
			<RadioItem bind:group={direction} name="east" value={'East'}>Going East</RadioItem>
			<RadioItem bind:group={direction} name="west" value={'West'}>Going West</RadioItem>
		</RadioGroup>
		<div class="flex flex-wrap gap-6">
			<button
				on:click|preventDefault={() => (wrongway = !wrongway)}
				class={wrongway ? 'variant-filled chip text-lg' : 'variant-ringed chip text-lg'}
				>Wrongway
			</button>
			<button
				on:click|preventDefault={() => (sidewalk = !sidewalk)}
				class={sidewalk ? 'variant-filled chip text-lg' : 'variant-ringed chip text-lg'}
				>On Sidewalk</button
			>
			<button
				on:click|preventDefault={() => (helmet = !helmet)}
				class={helmet ? 'variant-filled chip text-lg' : 'variant-ringed chip text-lg'}
				>Wearing Helmet</button
			>
			<button
				on:click|preventDefault={() => (female = !female)}
				class={female ? 'variant-filled chip text-lg' : 'variant-ringed chip text-lg'}
				>Female</button
			>
		</div>
		<button type="submit" class="btn btn-primary variant-filled-success min-w-full mt-4"
			>Submit
		</button>
	</div>
</form>

<h3 class="h3 text-center mt-8">Queued Trips</h3>
{#if $tripsQueued.length > 0}
	<div class="m-auto max-w-fit">
		{#each $tripsQueued as trip}
			<div class="card p-4 m-4 variant-ghost-surface max-w-xl">
				<span class="font-bold">{formatIsoTimestampToCustomString(trip.timestamp)}: </span>
				<span>{trip.quantity} cyclists going {trip.direction}</span>
				{#if trip.wrongway}<span> going the wrongway</span>{/if}
				<span>{trip.sidewalk ? ' on the sidewalk' : ' on the road'}</span>
				<span>{trip.helmet ? ' wearing helmets' : ' without helmets'}</span>
				<span>{trip.female ? ' who are female' : ' who are male'}</span>
			</div>
		{/each}
	</div>
{/if}

<button class="btn variant-filled" on:click={() => tripsQueued.update(() => [])}>Reset</button>
