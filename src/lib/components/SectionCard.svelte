<script lang="ts">
	export interface Props {
		classNumber: number;
		courseCode: string;
		section: string;
		schedule: Schedule[];
		faculty: string;
		capacity: number;
		enrolled: number;
		remarks: string;
	}

	export interface Schedule {
		day: string[];
		timeStart: string;
		timeEnd: string;
		room: string;
	}

	let { courseCode, faculty = 'NO FACULTY DECLARED' }: Props = $props();

	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{courseCode}</Card.Title>
	</Card.Header>
	<Card.Content>
        
    </Card.Content>
	<Card.Footer>&nbsp;</Card.Footer>
</Card.Root>
