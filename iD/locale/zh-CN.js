locale.zh-CN = {
    modes: {
        add_area: {
            title: "面",
            description: "Add parks, buildings, lakes or other areas to the map.",
            tail: "Click on the map to start drawing an area, like a park, lake, or building."
        },
        add_line: {
            title: "线",
            description: "Add highways, streets, pedestrian paths, canals or other lines to the map.",
            tail: "Click on the map to start drawing a road, path, or route."
        },
        add_point: {
            title: "点",
            description: "Add restaurants, monuments, postal boxes or other points to the map.",
            tail: "Click on the map to add a point."
        },
        browse: {
            title: "浏览",
            description: "Pan and zoom the map."
        },
        draw_area: {
            tail: "Click to add points to your area. Click the first point to finish the area."
        },
        draw_line: {
            tail: "Click to add more points to the line. Click on other lines to connect to them, and double-click to end the line."
        }
    },

    operations: {
        add: {
            annotation: {
                point: "Added a point.",
                vertex: "Added a node to a way."
            }
        },
        start: {
            annotation: {
                line: "Started a line.",
                area: "Started an area."
            }
        },
        'continue': {
            annotation: {
                line: "Continued a line.",
                area: "Continued an area."
            }
        },
        cancel_draw: {
            annotation: "Canceled drawing."
        },
        change_tags: {
            annotation: "Changed tags."
        },
        circularize: {
            title: "Circularize",
            description: "Make this round.",
            key: "O",
            annotation: {
                line: "Made a line circular.",
                area: "Made an area circular."
            }
        },
        orthogonalize: {
            title: "Orthogonalize",
            description: "Square these corners.",
            key: "Q",
            annotation: {
                line: "Squared the corners of a line.",
                area: "Squared the corners of an area."
            }
        },
        'delete': {
            title: "删除",
            description: "Remove this from the map.",
            annotation: {
                point: "Deleted a point.",
                vertex: "Deleted a node from a way.",
                line: "Deleted a line.",
                area: "Deleted an area.",
                relation: "Deleted a relation.",
                multiple: "Deleted {n} objects."
            }
        },
        connect: {
            annotation: {
                point: "Connected a way to a point.",
                vertex: "Connected a way to another.",
                line: "Connected a way to a line.",
                area: "Connected a way to an area."
            }
        },
        disconnect: {
            title: "断开",
            description: "Disconnect these ways from each other.",
            key: "D",
            annotation: "Disconnected ways."
        },
        merge: {
            title: "合成",
            description: "Merge these lines.",
            key: "C",
            annotation: "Merged {n} lines."
        },
        move: {
            title: "移动",
            description: "Move this to a different location.",
            key: "M",
            annotation: {
                point: "Moved a point.",
                vertex: "Moved a node in a way.",
                line: "Moved a line.",
                area: "Moved an area.",
                multiple: "Moved multiple objects."
            }
        },
        rotate: {
            title: "Rotate",
            description: "Rotate this object around its centre point.",
            key: "R",
            annotation: {
                line: "Rotated a line.",
                area: "Rotated an area."
            }
        },
        reverse: {
            title: "Reverse",
            description: "Make this line go in the opposite direction.",
            key: "V",
            annotation: "Reversed a line."
        },
        split: {
            title: "分割",
            description: "Split this into two ways at this point.",
            key: "X",
            annotation: "Split a way."
        }
    },

    nothing_to_undo: "Nothing to undo.",
    nothing_to_redo: "Nothing to redo.",

    just_edited: "You Just Edited OpenStreetMap!",
    browser_notice: "This editor is supported in Firefox, Chrome, Safari, Opera, and Internet Explorer 9 and above. Please upgrade your browser or use Potlatch 2 to edit the map.",
    view_on_osm: "View on OSM",
    zoom_in_edit: "zoom in to edit the map",
    logout: "logout",
    report_a_bug: "report a bug",

    commit: {
        title: "Save Changes",
        description_placeholder: "Brief description of your contributions",
        upload_explanation: "The changes you upload as {user} will be visible on all maps that use OpenStreetMap data.",
        save: "Save",
        cancel: "Cancel",
        warnings: "Warnings",
        modified: "Modified",
        deleted: "Deleted",
        created: "Created"
    },

    contributors: {
        list: "Viewing contributions by {users}",
        truncated_list: "Viewing contributions by {users} and {count} others"
    },

    geocoder: {
        title: "查询位置",
        placeholder: "Find a place",
        no_results: "Couldn't locate a place named '{name}'"
    },

    geolocate: {
        title: "Show My Location"
    },

    inspector: {
        no_documentation_combination: "There is no documentation available for this tag combination",
        no_documentation_key: "There is no documentation available for this key",
        new_tag: "New Tag",
        edit_tags: "Edit tags",
        okay: "Okay",
        view_on_osm: "View on OSM",
        name: "Name",
        editing: "Editing {type}",
        additional: "Additional tags",
        choose: "What are you adding?",
        results: "{n} results for {search}",
        reference: "View on OpenStreetMap Wiki →"
    },

    background: {
        title: "Background",
        description: "Background Settings",
        percent_brightness: "{opacity}% brightness",
        fix_misalignment: "Fix misalignment",
        reset: "reset"
    },

    restore: {
        description: "You have unsaved changes from a previous editing session. Do you wish to restore these changes?",
        restore: "Restore",
        reset: "Reset"
    },

    save: {
        title: "保存",
        help: "Save changes to OpenStreetMap, making them visible to other users.",
        no_changes: "No changes to save.",
        error: "An error occurred while trying to save",
        uploading: "Uploading changes to OpenStreetMap.",
        unsaved_changes: "You have unsaved changes"
    },

    splash: {
        welcome: "欢迎使用OpenStreetMap编辑器iD",
        text: "This is development version {version}. For more information see {website} and report bugs at {github}."
    },

    source_switch: {
        live: "live",
        dev: "dev"
    },

    tag_reference: {
        description: "Description",
        on_wiki: "{tag} on wiki.osm.org",
        used_with: "used with {type}"
    },

    validations: {
        untagged_point: "Untagged point which is not part of a line or area",
        untagged_line: "Untagged line",
        untagged_area: "Untagged area",
        many_deletions: "You're deleting {n} objects. Are you sure you want to do this? This will delete them from the map that everyone else sees on openstreetmap.org.",
        tag_suggests_area: "The tag {tag} suggests line should be area, but it is not an area",
        deprecated_tags: "Deprecated tags: {tags}"
    },

    zoom: {
        'in': "Zoom In",
        out: "Zoom Out"
    },

    // We expect these to be extracted at some point.
    "presets": {
        "forms": {
            "access": {
                "label": "Access"
            },
            "address": {
                "label": "Address",
                "placeholders": {
                    "housename": "Housename",
                    "number": "123",
                    "street": "Street",
                    "city": "City"
                }
            },
            "aeroway": {
                "label": "Type"
            },
            "amenity": {
                "label": "Type"
            },
            "atm": {
                "label": "ATM"
            },
            "bicycle_parking": {
                "label": "Type"
            },
            "building": {
                "label": "Building"
            },
            "building_area": {
                "label": "Building"
            },
            "building_yes": {
                "label": "Building"
            },
            "capacity": {
                "label": "Capacity"
            },
            "collection_times": {
                "label": "Collection Times"
            },
            "construction": {
                "label": "Type"
            },
            "crossing": {
                "label": "Type"
            },
            "cuisine": {
                "label": "Cuisine"
            },
            "denomination": {
                "label": "Denomination"
            },
            "denotation": {
                "label": "Denotation"
            },
            "elevation": {
                "label": "Elevation"
            },
            "emergency": {
                "label": "Emergency"
            },
            "fax": {
                "label": "Fax"
            },
            "fee": {
                "label": "Fee"
            },
            "highway": {
                "label": "Type"
            },
            "internet_access": {
                "label": "Internet Access",
                "options": {
                    "yes": "Yes",
                    "no": "No",
                    "wlan": "Wifi",
                    "wired": "Wired",
                    "terminal": "Terminal"
                }
            },
            "landuse": {
                "label": "Type"
            },
            "layer": {
                "label": "Layer"
            },
            "leisure": {
                "label": "Type"
            },
            "levels": {
                "label": "Levels"
            },
            "man_made": {
                "label": "Type"
            },
            "maxspeed": {
                "label": "Speed Limit"
            },
            "natural": {
                "label": "Natural"
            },
            "network": {
                "label": "Network"
            },
            "office": {
                "label": "Type"
            },
            "oneway": {
                "label": "One Way"
            },
            "opening_hours": {
                "label": "Hours"
            },
            "operator": {
                "label": "Operator"
            },
            "phone": {
                "label": "Phone"
            },
            "place": {
                "label": "Type"
            },
            "railway": {
                "label": "Type"
            },
            "religion": {
                "label": "Religion",
                "options": {
                    "christian": "Christian",
                    "muslim": "Muslim",
                    "buddhist": "Buddhist",
                    "jewish": "Jewish",
                    "hindu": "Hindu",
                    "shinto": "Shinto",
                    "taoist": "Taoist"
                }
            },
            "roadtype": {
                "label": "Features",
                "options": {
                    "bridge": "Bridge",
                    "tunnel": "Tunnel",
                    "embankment": "Embankment",
                    "cutting": "Cutting"
                }
            },
            "service": {
                "label": "Type"
            },
            "shelter": {
                "label": "Shelter"
            },
            "shop": {
                "label": "Type"
            },
            "source": {
                "label": "Source"
            },
            "sport": {
                "label": "Sport"
            },
            "surface": {
                "label": "Surface"
            },
            "tourism": {
                "label": "Type"
            },
            "wikipedia": {
                "label": "Wikipedia"
            },
            "water": {
                "label": "Type"
            },
            "waterway": {
                "label": "Type"
            },
            "wetland": {
                "label": "Type"
            },
            "wood": {
                "label": "Type"
            }
        }
    }
};
