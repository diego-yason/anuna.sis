<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Form from "$lib/components/ui/form";
    import { Button } from "$lib/components/ui/button";
</script>

<Dialog.Root>
    <Dialog.Trigger>
        <Button>Create custom class</Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <form>
            <Form.Field>
                <Form.Control></Form.Control>
                <Form.Description></Form.Description>
                <Form.FieldErrors></Form.FieldErrors>
            </Form.Field>
        </form>
    </Dialog.Content>
</Dialog.Root>
