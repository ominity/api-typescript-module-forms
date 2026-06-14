# `@ominity/api-module-forms`

TypeScript SDK module for the Ominity Forms API.

This package plugs into [`@ominity/api-typescript`](https://www.npmjs.com/package/@ominity/api-typescript) and adds typed access to:

- forms list
- form get
- form submissions list
- form submission get
- form submission create
- form submission update
- form submission delete

## Install

```bash
npm install @ominity/api-typescript @ominity/api-module-forms
```

## Usage

```ts
import { Ominity } from "@ominity/api-typescript";
import { formsModule } from "@ominity/api-module-forms";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env.OMINITY_API_KEY ?? "",
  },
  modules: [formsModule()],
});
```

You can also register the module after construction:

```ts
import { Ominity } from "@ominity/api-typescript";
import { FormsModule } from "@ominity/api-module-forms";

const ominity = new Ominity({
  serverURL: "https://tenant-a.ominity.com/api",
  security: {
    apiKey: process.env.OMINITY_API_KEY ?? "",
  },
});

ominity.use(FormsModule);
```

## Forms

### List forms

```ts
const forms = await ominity.modules.forms.forms.list({
  page: 1,
  limit: 20,
  filter: {
    id: 2,
  },
});

console.log(forms.items);
console.log(forms.count);
```

### Get form

```ts
const form = await ominity.modules.forms.forms.get({
  id: 2,
});

console.log(form.id);
console.log(form.name);
```

Form resources can include embedded field definitions from the HAL payload:

```ts
const fields = form.embedded?.form_fields ?? [];

for (const field of fields) {
  console.log(field.name, field.type);
}
```

## Submissions

### List submissions

```ts
const submissions = await ominity.modules.forms.submissions.list({
  page: 1,
  limit: 20,
  filter: {
    form_id: 2,
  },
  sort: "-id",
});

console.log(submissions.items);
```

### Get submission

```ts
const submission = await ominity.modules.forms.submissions.get({
  id: 15,
});

console.log(submission.formId);
console.log(submission.data);
```

### Create submission

```ts
const created = await ominity.modules.forms.submissions.create({
  formId: 2,
  userId: null,
  recaptchaToken: null,
  data: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    service: [],
    metadata: {
      locale: "en-US",
      page_url: "https://example.com/contact",
    },
  },
});

console.log(created.id);
```

### Update submission

```ts
const updated = await ominity.modules.forms.submissions.update({
  id: 15,
  body: {
    data: {
        name: "Jane Doe",
        email: "jane.doe@example.com"
    },
  },
});

console.log(updated.updatedAt);
```

### Delete submission

```ts
await ominity.modules.forms.submissions.delete({
  id: 15,
});
```

## Exported Types

This package exports the public models and operation types for forms and submissions, for example:

```ts
import type {
  Form,
  FormField,
  Submission,
  CreateSubmissionRequest,
  UpdateSubmissionRequest,
  ListSubmissionsResponse,
} from "@ominity/api-module-forms";
```

## Resource Shape Notes

- HAL `_links` are mapped to `links`
- HAL `_embedded.form_fields` is mapped to `embedded.form_fields`
- paginated collections are exposed as `{ items, count, links, ...pagination }`
- submission `data` is intentionally typed as `Record<string, unknown>` because form payloads are schema-driven

## Current Scope

This package currently exposes:

- `ominity.modules.forms.forms`
- `ominity.modules.forms.submissions`

The backend Forms module also has standalone form-field endpoints, but this package does not expose a dedicated `fields` SDK resource yet.

## Development

```bash
npm run lint
npm run build
```
