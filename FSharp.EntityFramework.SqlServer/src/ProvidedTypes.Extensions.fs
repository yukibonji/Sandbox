﻿[<AutoOpen>]
module ProviderImplementation.ProvidedTypes.Extensions

open System
open System.Reflection
open System.IO

type ProvidedAssembly with
    static member GetTemp() = 
        let assemblyFileName = Path.ChangeExtension( Path.GetTempFileName(), "dll")
        ProvidedAssembly( assemblyFileName)

type ProvidedTypeDefinition with
    member this.AddToTempAssembly() = 
        ProvidedAssembly.GetTemp().AddTypes [ this ] 

let inline addCustomAttribute<'T, ^P when 'T :> Attribute and ^P : (member AddCustomAttribute : System.Reflection.CustomAttributeData -> unit)> (provided: ^P, ctorArgs: obj list, namedArgs: list<string * obj>) = 
    let attrData = { 
        new CustomAttributeData() with
            member __.Constructor = typeof<'T>.GetConstructor [| for value in ctorArgs -> value.GetType() |]
            member __.ConstructorArguments = upcast [| for value in ctorArgs -> CustomAttributeTypedArgument value |]
            member __.NamedArguments = 
                upcast [| 
                    for propName, value in namedArgs do 
                        let property = typeof<'T>.GetProperty propName
                        yield CustomAttributeNamedArgument(property, value) 
                |] 
    }
    (^P : (member AddCustomAttribute : System.Reflection.CustomAttributeData -> unit) (provided, attrData))