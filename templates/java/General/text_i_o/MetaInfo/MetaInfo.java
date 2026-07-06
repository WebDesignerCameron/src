public class MetaInfo implements AutoCloseable {
    public String message;
    public boolean on;

    // Constructor 1
    public MetaInfo(boolean show) {
        this.on = show;
    }

    // Constructor 2
    public MetaInfo(String msg) {
        this.on = true;
        this.message = msg;
        System.out.print(this);
    }

    // Copy Constructor equivalent
    public MetaInfo(MetaInfo o) {
        this.message = "Constructing Copy(MetaInfo)";
        // Note: 'on' defaults to false in Java unless explicitly copied or set, 
        // matching the uninitialized state in the C++ snippet.
        System.out.print(this);
    }

    // Destructor equivalent (Call close() or use try-with-resources)
    @Override
    public void close() {
        this.message = "Destructing(MetaInfo)";
        System.out.print(this);
    }

    // Operator << equivalent
    @Override
    public String toString() {
        if (this.on) {
            return this.message + "\n";
        }
        return "";
    }
}