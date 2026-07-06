using System;

public class MetaInfo
{
    public string Message { get; set; } = "";
    public bool On { get; set; }

    // Constructor 1
    public MetaInfo(bool show)
    {
        On = show;
    }

    // Constructor 2
    public MetaInfo(string msg)
    {
        On = true;
        Message = msg;
        Console.Write(this.ToString());
    }

    // Copy Constructor (C# doesn't have native copy constructors, but this mimics the logic)
    public MetaInfo(MetaInfo o)
    {
        Message = "Constructing Copy(MetaInfo)";
        On = o.On; // Explicitly copying state if needed for ToString
        Console.Write(this.ToString());
    }

    // Finalizer / Destructor
    ~MetaInfo()
    {
        Message = "Destructing(MetaInfo)";
        // Note: Console.Write inside a finalizer may not always execute if the app is shutting down
        Console.Write(this.ToString());
    }

    // Replaces the C++ ostream << operator overload
    public override string ToString()
    {
        if (On)
        {
            return Message + Environment.NewLine;
        }
        return string.Empty;
    }
}