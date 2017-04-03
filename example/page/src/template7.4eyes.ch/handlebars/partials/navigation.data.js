'use strict';

var _ = require(modulesPath + 'lodash'),
    requireNew = require(modulesPath + 'require-new')
    ;

var data = {
    lvl1 : [
        {
            label: 'Seite 1',
            href: '#',
            lvl2: [
                {
                    label: 'Seite 1.1',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 1.1.1',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 1.2',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 1.2.1',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 1.3',
                    href: '#'
                },
                {
                    label: 'Seite 1.4',
                    href: '#'
                }
            ]
        },
        {
            label: 'Seite 2',
            href: '#',
            lvl2: [
                {
                    label: 'Seite 2.1',
                    href: '#'
                },
                {
                    label: 'Seite 2.2',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 2.2.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 2.2.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 2.3',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 2.3.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 2.3.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 2.4',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 2.4.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 2.4.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 2.5',
                    href: '#'
                },
                {
                    label: 'Seite 2.6',
                    href: '#'
                }
            ]
        },
        {
            label: 'Seite 3',
            href: '#',
            lvl2: [
                {
                    label: 'Seite 3.1',
                    href: '#'
                },
                {
                    label: 'Seite 3.2',
                    href: '#'
                },
                {
                    label: 'Seite 3.3',
                    href: '#'
                },
                {
                    label: 'Seite 3.4',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 3.4.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.4.2',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.4.3',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.4.4',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.4.5',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 3.5',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 3.5.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.5.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 3.6',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 3.6.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.6.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 3.7',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 3.7.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.7.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 3.8',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 3.8.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.8.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 3.9',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 3.9.1',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.9.2',
                            href: '#'
                        }
                    ]
                },
                {
                    label: 'Seite 3.10',
                    href: '#',
                    lvl3: [
                        {
                            label: 'Seite 3.10.2',
                            href: '#'
                        },
                        {
                            label: 'Seite 3.10.2',
                            href: '#'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Seite 4',
            href: '#'
        },
        {
            label: 'Seite 5',
            href: '#'
        }
    ],
    variants: {
    },
    modules: {
    }
};

module.exports = data;