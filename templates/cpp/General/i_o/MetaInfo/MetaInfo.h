#include <iostream>
#include <string>
using namespace std;
class MetaInfo {
public:
    string message;
    bool on;
    MetaInfo(bool show) {
        on = show;
    }
    MetaInfo(std::string msg);
    MetaInfo(const MetaInfo &o);
    ~MetaInfo();
};
ostream &operator<<(ostream &stream, const MetaInfo &obj) {
    if (obj.on) {
        stream << obj.message << endl;
    }
    return stream;
}
MetaInfo::MetaInfo(std::string msg) {
    on = true;
    message = msg;
    cout << *this;
}
MetaInfo::MetaInfo(const MetaInfo &o) {
    message = "Constructing Copy(MetaInfo)";
    cout << *this;
}
MetaInfo::~MetaInfo() {
    message = "Destructing(MetaInfo)";
    cout << *this;
}