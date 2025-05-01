export const TEMPLATE_DEFAULT_PUBLIC_ORDER_BY = 'createdAt';
export const TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_ORDER_BY = [
    'createdAt',
    'popularityScore',
    'updatedAt',
    '_score',
];
export const TEMPLATE_DEFAULT_PUBLIC_AVAILABLE_SEARCH = [
    { field: 'title', boost: 3 },
    { field: 'description', boost: 2 },
    { field: 'topic', boost: 2 },
    { field: 'owner.firstName', boost: 1 },
    { field: 'owner.lastName', boost: 1 },
    { field: 'owner.email', boost: 1 },
    { field: 'sharedUsers.firstName', boost: 1 },
    { field: 'sharedUsers.lastName', boost: 1 },
    { field: 'sharedUsers.email', boost: 1 },
    { field: 'tags.name', boost: 2 },
    { field: 'tags.description', boost: 1 },
    { field: 'questions.title', boost: 2 },
    { field: 'questions.description', boost: 1 },
    { field: 'comments.text', boost: 1 },
];

export const TEMPLATE_DEFAULT_USER_ORDER_BY = 'createdAt';
export const TEMPLATE_DEFAULT_USER_AVAILABLE_ORDER_BY = [
    'createdAt',
    'popularityScore',
    'updatedAt',
    '_score',
];

export const TEMPLATE_DEFAULT_USER_AVAILABLE_SEARCH = [
    { field: 'title', boost: 3 },
    { field: 'description', boost: 2 },
    { field: 'topic', boost: 2 },
    { field: 'owner.firstName', boost: 1 },
    { field: 'owner.lastName', boost: 1 },
    { field: 'owner.email', boost: 1 },
    { field: 'sharedUsers.firstName', boost: 1 },
    { field: 'sharedUsers.lastName', boost: 1 },
    { field: 'sharedUsers.email', boost: 1 },
    { field: 'tags.name', boost: 2 },
    { field: 'tags.description', boost: 1 },
    { field: 'questions.title', boost: 2 },
    { field: 'questions.description', boost: 1 },
    { field: 'comments.text', boost: 1 },
];

export const TEMPLATE_DEFAULT_ADMIN_ORDER_BY = 'createdAt';
export const TEMPLATE_DEFAULT_ADMIN_AVAILABLE_ORDER_BY = [
    'createdAt',
    'popularityScore',
    'updatedAt',
    '_score',
];

export const TEMPLATE_DEFAULT_ADMIN_AVAILABLE_SEARCH = [
    { field: 'title', boost: 3 },
    { field: 'description', boost: 2 },
    { field: 'topic', boost: 2 },
    { field: 'owner.firstName', boost: 1 },
    { field: 'owner.lastName', boost: 1 },
    { field: 'owner.email', boost: 1 },
    { field: 'sharedUsers.firstName', boost: 1 },
    { field: 'sharedUsers.lastName', boost: 1 },
    { field: 'sharedUsers.email', boost: 1 },
    { field: 'tags.name', boost: 2 },
    { field: 'tags.description', boost: 1 },
    { field: 'questions.title', boost: 2 },
    { field: 'questions.description', boost: 1 },
    { field: 'comments.text', boost: 1 },
];
