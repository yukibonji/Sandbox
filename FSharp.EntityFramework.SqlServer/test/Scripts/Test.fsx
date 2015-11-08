﻿#load "EFDependecies.fsx"

#r @"System.Transactions.dll"
#r @"..\src\bin\Debug\FSharp.EntityFramework.SqlServer.dll"

open FSharp.Data.Entity

type AdventureWorks = DbContext<"Data Source=.;Initial Catalog=AdventureWorks2014;Integrated Security=True">

open Microsoft.Data.Entity

let db = new AdventureWorks()
db.OnConfiguring <- fun optionsBuilder -> 
    optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=AdventureWorks2014;Integrated Security=True") |> ignore

db.OnModelCreating <- fun modelBuilder -> 
    modelBuilder.Entity<AdventureWorks.``HumanResources.Shift``>().ToTable("Shift", "HumanResources") |> ignore

query {
    for x in db.``HumanResources.ShiftTable`` do
    where (x.ShiftID > 1uy)
    select x.Name
}
|> Seq.iter (printfn "Shift: %s")


