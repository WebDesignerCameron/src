#include <stdio.h>
#include <stdbool.h>
#include <string.h>

typedef struct {
    char message[100];
    bool on;
} MetaInfo;

void printMetaInfo(const MetaInfo *obj) {
    if (obj->on) {
        printf("%s\n", obj->message);
    }
}

void initMetaInfoBool(MetaInfo *obj, bool show) {
    obj->on = show;
    strcpy(obj->message, ""); // Initialize with an empty string
}

void initMetaInfoMsg(MetaInfo *obj, const char *msg) {
    obj->on = true;
    strncpy(obj->message, msg, sizeof(obj->message) - 1);
    obj->message[sizeof(obj->message) - 1] = '\0'; // Ensure null-termination
    printMetaInfo(obj);
}

void initMetaInfoCopy(MetaInfo *obj, const MetaInfo *o) {
    obj->on = o->on; // Copying the state
    strcpy(obj->message, "Constructing Copy(MetaInfo)");
    printMetaInfo(obj);
}

void destroyMetaInfo(MetaInfo *obj) {
    strcpy(obj->message, "Destructing(MetaInfo)");
    printMetaInfo(obj);
}